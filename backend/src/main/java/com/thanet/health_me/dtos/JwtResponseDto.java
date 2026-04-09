package com.thanet.health_me.dtos;

public class JwtResponseDto {
    private String accessToken;   
    private String refreshToken;

    public JwtResponseDto(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }    

    public String getToken(){
        return accessToken;
    }

    public String getRefreshToken(){
        return refreshToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    

}
