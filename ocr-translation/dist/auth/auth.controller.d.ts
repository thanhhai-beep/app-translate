import { HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto, res: Response): Promise<{
        statusCode: HttpStatus;
        message: string;
        error?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        error: any;
    }>;
    checkAuth(): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
