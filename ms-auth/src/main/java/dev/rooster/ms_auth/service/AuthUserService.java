package dev.rooster.ms_auth.service;

import dev.rooster.ms_auth.dto.AuthUserDto;
import dev.rooster.ms_auth.entity.AuthUser;
import dev.rooster.ms_auth.entity.TokenDto;

public interface AuthUserService {
    public AuthUser save(AuthUserDto authUserDto);

    public TokenDto login(AuthUserDto authUserDto);

    public TokenDto validate(String token);
}
