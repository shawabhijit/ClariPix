package com.backend.Security;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.security.PublicKey;
import java.util.Base64;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class ClerkJwtAuthFilter extends OncePerRequestFilter {

    @Value("{clerk.issuer}")
    private String clerkIssuer;

    private final ClerkJwksProvider clerkJwksProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN , "Authorization header is missing/invalid");
            return;
        }

        try {
            String token = authHeader.substring(7);

            //extract the kid from the header
            String[] chunks = token.split("\\.");
            String headerJson = new String(Base64.getUrlDecoder().decode(chunks[0]));
            ObjectMapper mapper = new ObjectMapper();
            JsonNode headerNode = mapper.readTree(headerJson);
            String kid = headerNode.get("kid").asText();

            // get the correct public key
            PublicKey publicKey = clerkJwksProvider.getPublicKey(kid);

            // verify the token
            Claims claims = Jwts.parser()
                    .setSigningKey(publicKey)
                    .clockSkewSeconds(60)
                    .requireIssuer(clerkIssuer)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            String clerkUserId = claims.getSubject();

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    clerkUserId, null , Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN"))
            );
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            filterChain.doFilter(request, response);
        }
        catch (Exception e) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN , "Invalid JWT token");
            return;
        }
    }
}
