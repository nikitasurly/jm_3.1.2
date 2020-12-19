package com.example.demo.config.handler;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest,
                                        HttpServletResponse httpServletResponse,
                                        Authentication authentication) throws IOException {
        boolean isAdmin = false;
        boolean isUser = false;

        for (GrantedAuthority auth : authentication.getAuthorities()) {
            if (auth.getAuthority().equals("ROLE_ADMIN")) {
                isAdmin = true;
            } else if("ROLE_USER".equals(auth.getAuthority())) {
                isUser = true;
            }
        }

        if (isAdmin) {
            httpServletResponse.sendRedirect("/admin");
        } else if (isUser) {
            httpServletResponse.sendRedirect("/user");
        }
    }
}