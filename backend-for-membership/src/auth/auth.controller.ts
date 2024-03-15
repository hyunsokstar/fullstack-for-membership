import { Controller, Post, Body, UseGuards, Req, Get, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
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
    @HttpCode(HttpStatus.CREATED)
    async signUp(@Body() userData: SignUpUserDto): Promise<{ success: boolean; message: string; user: UsersModel }> {
        const isUserExist = await this.authService.findUserByEmail(userData.email);

        if (isUserExist) {
            throw new HttpException({ success: false, message: 'user is already exists', user: null }, HttpStatus.CONFLICT);
        }

        const user = await this.authService.signUp(userData);

        return { success: true, message: 'Sign Up success', user };

    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signIn(@Body() userData: SignInUserDto): Promise<{ success: boolean, accessToken: string, loginUser: UsersModel }> {
        const result = await this.authService.signIn(userData);

        return {
            success: result.success,
            accessToken: result.accessToken,
            loginUser: result.loginUser
        };
    }


    @UseGuards(AuthGuard())
    @Get('loginCheck')
    loginCheck(@Req() req: RequestWithUser): any {
        const user = req.user;
        if (user) {
            return {
                success: true,
                loginUser: user,
            };
        } else {
            return {
                success: false,
                message: 'User is not logged in',
            };
        }
    }


}
