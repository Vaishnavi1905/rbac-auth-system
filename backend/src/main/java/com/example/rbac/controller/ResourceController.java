package com.example.rbac.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@Tag(name = "Resources", description = "Role-based protected resource endpoints")
public class ResourceController {

    @GetMapping("/public")
    @Operation(summary = "Get public content", description = "Accessible by anyone (no authentication required)")
    public ResponseEntity<Map<String, Object>> getPublicContent() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "This is PUBLIC content. Anyone can access this without logging in.");
        response.put("status", "SUCCESS");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user")
    @Operation(
            summary = "Get user-level content", 
            description = "Accessible by users with ROLE_USER or ROLE_ADMIN",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<Map<String, Object>> getUserContent() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "This is USER-level content. Accessible by both USER and ADMIN roles.");
        response.put("status", "SUCCESS");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/admin")
    @Operation(
            summary = "Get admin-level content", 
            description = "Accessible ONLY by users with ROLE_ADMIN",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<Map<String, Object>> getAdminContent() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "This is ADMIN-level content. Accessible ONLY by ADMIN role.");
        response.put("status", "SUCCESS");
        return ResponseEntity.ok(response);
    }
}
