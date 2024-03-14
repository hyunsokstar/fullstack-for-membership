import { Repository } from 'typeorm';
import { UsersModel } from 'src/users/entities/user.entity';
import { SignUpUserDto } from './dto/signup-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<UsersModel>, jwtService: JwtService);
    signUp(userData: SignUpUserDto): Promise<UsersModel>;
    signIn(userData: SignInUserDto): Promise<{
        accessToken: string;
    }>;
}
