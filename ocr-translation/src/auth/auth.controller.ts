import { Controller, Post, Body, Res, HttpStatus, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login to the system' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Login successful',
    schema: {
      example: {
        message: 'Login successful'
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Invalid credentials',
    schema: {
      example: {
        message: 'Invalid email or password'
      }
    }
  })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { email, password } = loginDto;
      const isValid = await this.authService.validateUser(email, password);

      if (!isValid) {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid email or password',
        };
      }

      const token = await this.authService.login(email);

      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'strict',
        path: '/',
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Login successful',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred during login',
        error: error.message,
      };
    }
  }

  @Get('check')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Check authentication status' })
  @ApiResponse({ 
    status: 200, 
    description: 'User is authenticated',
    schema: {
      example: {
        message: 'Authenticated'
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'User is not authenticated',
    schema: {
      example: {
        message: 'Unauthorized'
      }
    }
  })
  async checkAuth() {
    return {
      statusCode: HttpStatus.OK,
      message: 'Authenticated',
    };
  }
}
