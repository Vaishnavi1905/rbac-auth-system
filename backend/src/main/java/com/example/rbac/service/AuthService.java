package com.example.rbac.service;

import com.example.rbac.config.JwtService;
import com.example.rbac.dto.AuthResponse;
import com.example.rbac.dto.LoginRequest;
import com.example.rbac.dto.RegisterRequest;
import com.example.rbac.dto.UserDto;
import com.example.rbac.entity.User;
import com.example.rbac.mapper.UserMapper;
import com.example.rbac.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;
    private final UserMapper userMapper;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email address already in use.");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        User savedUser = userRepository.save(user);
        UserDetails userDetails = userDetailsService.loadUserByUsername(savedUser.getEmail());
        
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("role", savedUser.getRole().name());
        extraClaims.put("name", savedUser.getName());
        
        String jwtToken = jwtService.generateToken(userDetails, extraClaims);

        return AuthResponse.builder()
                .token(jwtToken)
                .user(userMapper.toDto(savedUser))
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found."));

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("role", user.getRole().name());
        extraClaims.put("name", user.getName());
        
        String jwtToken = jwtService.generateToken(userDetails, extraClaims);

        return AuthResponse.builder()
                .token(jwtToken)
                .user(userMapper.toDto(user))
                .build();
    }
}
