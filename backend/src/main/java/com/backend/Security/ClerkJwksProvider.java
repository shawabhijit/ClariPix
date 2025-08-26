package com.backend.Security;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.math.BigInteger;
import java.net.URL;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.RSAPublicKeySpec;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
public class ClerkJwksProvider {

    @Value("${clerk.jwks-url}")
    private String jwksUrl;

    private final Map<String, PublicKey> keyCache = new HashMap<>();
    private long lastFetchTime = 0;
    private static final long CACHE_TTL = 3600000; // 1 HOUR

    public PublicKey getPublicKey(String kid) throws Exception {
        log.debug("Requesting public key for kid: {}", kid);

        if (keyCache.containsKey(kid) && System.currentTimeMillis() - lastFetchTime < CACHE_TTL) {
            log.debug("Returning cached key for kid: {}", kid);
            return keyCache.get(kid);
        }

        log.debug("Cache miss or expired, refreshing keys from JWKS endpoint");
        refreshKeys();

        PublicKey key = keyCache.get(kid);
        if (key == null) {
            throw new IllegalArgumentException("Public key not found for kid: " + kid);
        }

        return key;
    }

    private void refreshKeys() throws Exception {
        log.debug("Fetching JWKS from: {}", jwksUrl);

        ObjectMapper mapper = new ObjectMapper();
        JsonNode jwks = mapper.readTree(new URL(jwksUrl));

        JsonNode keys = jwks.get("keys");
        if (keys == null || !keys.isArray()) {
            throw new IllegalStateException("Invalid JWKS response: missing 'keys' array");
        }

        int keyCount = 0;
        for (JsonNode key : keys) {
            String kid = key.get("kid").asText();
            String kty = key.get("kty").asText();
            String alg = key.get("alg").asText();
            String use = key.has("use") ? key.get("use").asText() : "sig"; // Default to signature use

            log.debug("Processing key - kid: {}, kty: {}, alg: {}, use: {}", kid, kty, alg, use);

            if ("RSA".equals(kty) && "RS256".equals(alg) && "sig".equals(use)) {
                String n = key.get("n").asText();
                String e = key.get("e").asText();

                try {
                    PublicKey publicKey = createPublicKey(n, e);
                    keyCache.put(kid, publicKey);
                    keyCount++;
                    log.debug("Successfully cached public key for kid: {}", kid);
                } catch (Exception ex) {
                    log.error("Failed to create public key for kid: {}", kid, ex);
                    throw ex;
                }
            } else {
                log.debug("Skipping key with kid: {} (not RS256 RSA signature key)", kid);
            }
        }

        lastFetchTime = System.currentTimeMillis();
        log.info("Refreshed {} RSA keys from JWKS endpoint", keyCount);
    }

    private PublicKey createPublicKey(String modulus, String exponent) throws Exception {
        log.debug("Creating RSA public key from modulus and exponent");

        try {
            // Use URL-safe Base64 decoder instead of standard Base64 decoder
            byte[] modulusBytes = Base64.getUrlDecoder().decode(modulus);
            byte[] exponentBytes = Base64.getUrlDecoder().decode(exponent);

            BigInteger modulusBigInt = new BigInteger(1, modulusBytes);
            BigInteger exponentBigInt = new BigInteger(1, exponentBytes);

            RSAPublicKeySpec spec = new RSAPublicKeySpec(modulusBigInt, exponentBigInt);
            KeyFactory factory = KeyFactory.getInstance("RSA");

            PublicKey publicKey = factory.generatePublic(spec);
            log.debug("Successfully created RSA public key");

            return publicKey;
        } catch (IllegalArgumentException e) {
            log.error("Base64 decoding failed for modulus: {} or exponent: {}",
                    modulus.substring(0, Math.min(20, modulus.length())),
                    exponent.substring(0, Math.min(20, exponent.length())), e);
            throw new IllegalArgumentException("Invalid Base64 encoding in JWKS key parameters", e);
        } catch (Exception e) {
            log.error("Failed to create RSA public key", e);
            throw e;
        }
    }
}