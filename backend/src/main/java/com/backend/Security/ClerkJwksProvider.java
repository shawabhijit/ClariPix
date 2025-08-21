package com.backend.Security;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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

@Component
public class ClerkJwksProvider {

    @Value("${clerk.jwtk-url}")
    private String jwksUrl;

    private final Map<String , PublicKey> keyCache = new HashMap<>();
    private long lastFetchTime = 0;
    private static final long CACHE_TTL = 3600000; // 1 HOUR


    public PublicKey getPublicKey(String kid) throws Exception {
        if (keyCache.containsKey(kid) && System.currentTimeMillis() - lastFetchTime < CACHE_TTL) {
            return keyCache.get(kid);
        }
        refreshKeys();
        return keyCache.get(kid);
    }

    public void refreshKeys () throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jwks = mapper.readTree(new URL(jwksUrl));

        JsonNode keys = jwks.get("keys");
        for (JsonNode key : keys) {
            String kid = key.get("kid").asText();
            String kty = key.get("kty").asText();
            String alg = key.get("alg").asText();

            if ("RSA".equals(kty) && "RS256".equals(alg)) {
                String n = key.get("n").asText();
                String e = key.get("e").asText();

                PublicKey publicKey = createPublicKey(n, e);
                keyCache.put(kid , publicKey);
            }
        }
        lastFetchTime = System.currentTimeMillis();
    }

    public PublicKey createPublicKey (String modules , String exponent) throws Exception {

        byte[] moduleBytes = Base64.getDecoder().decode(modules);
        byte[] exponentBytes = Base64.getDecoder().decode(exponent);

        BigInteger modulesBigInt = new BigInteger(1, moduleBytes);
        BigInteger exponentBigInt = new BigInteger(1, exponentBytes);

        RSAPublicKeySpec spec = new RSAPublicKeySpec(modulesBigInt, exponentBigInt);
        KeyFactory factory = KeyFactory.getInstance("RSA");

        return factory.generatePublic(spec);
    }
}
