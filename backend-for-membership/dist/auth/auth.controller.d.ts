import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/signup-user.dto';
import { UsersModel } from 'src/users/entities/user.entity';
import { SignInUserDto } from './dto/signin-user.dto';
import { RequestWithUser } from './interfaces/request-with-user.interface';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(userData: SignUpUserDto): Promise<{
        success: boolean;
        message: string;
        user: UsersModel;
    }>;
    signIn(userData: SignInUserDto): Promise<{
        success: boolean;
        accessToken: string;
        loginUser: UsersModel;
    }>;
    loginCheck(req: RequestWithUser): any;
}
