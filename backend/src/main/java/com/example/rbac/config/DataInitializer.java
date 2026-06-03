package com.example.rbac.config;

import com.example.rbac.entity.Role;
import com.example.rbac.entity.User;
import com.example.rbac.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (!userRepository.existsByEmail("admin@example.com")) {
            User admin = User.builder()
                    .name("Default Admin")
                    .email("admin@example.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(admin);
            System.out.println("Seeded default admin user: admin@example.com / admin123");
        }

        if (!userRepository.existsByEmail("user@example.com")) {
            User user = User.builder()
                    .name("Default User")
                    .email("user@example.com")
                    .password(passwordEncoder.encode("user123"))
                    .role(Role.USER)
                    .build();
            userRepository.save(user);
            System.out.println("Seeded default standard user: user@example.com / user123");
        }
    }
}
