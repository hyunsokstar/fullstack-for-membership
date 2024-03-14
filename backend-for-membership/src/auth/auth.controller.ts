import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/signup-user.dto';
import { UsersModel } from 'src/users/entities/user.entity';
import { SignInUserDto } from './dto/signin-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from './interfaces/request-with-user.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    async signUp(@Body() userData: SignUpUserDto): Promise<UsersModel> {
        return this.authService.signUp(userData);
    }

    @Post('signin')
    async signIn(@Body() userData: SignInUserDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(userData);
    }

    @UseGuards(AuthGuard())
    @Get('loginCheck')
    loginCheck(@Req() req: RequestWithUser): any {
        const user = req.user;
        if (user) {
            return {
                success: true,
                user: user,
            };
        } else {
            return {
                success: false,
                message: 'User is not logged in',
            };
        }
    }


}
