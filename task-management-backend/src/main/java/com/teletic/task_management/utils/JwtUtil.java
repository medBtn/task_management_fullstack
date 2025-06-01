package com.teletic.task_management.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.lang.Function;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    public static final String SECRET = "2be27daa07e34a296045ccabab0c383565ad0383a7c530d28df6e5dd40efc42d2252d2e2c29a277b80f4f45022caee53f15c4b1fd66eb11a2ffb646d502471681b84906393588bf7ff1c8ca824527783edf32d7a02203fc73231a424ae32f551f278239b7311dfd0c4f90192f96890e9a938f1ca556d1a20b0bfb1f594aadf0b20bf4875b0ef551aca65d96db474594e2c84eb905f9d34a4b7af4632d315b56d1ab625c5224375d63da9c617e5a0476d80ca4e10f320c86d721460673b24d1357207f61526a8ea8957c2ad478beb3f7894b3a8b43cfa0a2eaf16cd68b74062358b4dcb9ffa3bda23c971b21ca0f38c136cc866459ea59dab94e1d9e1b8fb9e3e";

    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<String, Object>();
        return this.createToken(claims, username);
    }

    private String createToken(Map<String, Object> claims, String username) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                .signWith(getSignKey(), SignatureAlgorithm.HS256).compact();
    }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);

    }

    public String extractUsername(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    public <T> T extractClaims(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(getSignKey()).build().parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Date extractExpiration(String token) {
        return extractClaims(token, Claims::getExpiration);
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

}
