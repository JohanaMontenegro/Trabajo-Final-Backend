import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './registerDTO';
import { LoginDto } from './loginDto';
import { AuthGuard } from './guard/auth.guard';
import { request } from 'http';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

@Post('register')
    register(@Body() registerDto: RegisterDTO) {
        return this.authService.register(registerDto);
    }

@Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
    
    @Get('profile')
    @UseGuards(AuthGuard)
    profile(
        @Request()
        req){
        return req.usuario 
    }
}
