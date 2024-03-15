import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsersModel } from 'src/users/entities/user.entity';
import { SignUpUserDto } from './dto/signup-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersModel)
        private usersRepository: Repository<UsersModel>,
        private jwtService: JwtService,  // JwtService 주입
    ) { }

    async findUserByEmail(email: string): Promise<boolean> {
        const isUserExist = await this.usersRepository.findOne({ where: { email: email } });
        return !!isUserExist;
    }

    async signUp(userData: SignUpUserDto): Promise<UsersModel> {
        const { email, password } = userData;
        const user = new UsersModel();
        user.email = email;
        user.password = await bcrypt.hash(password, 10);

        await this.usersRepository.save(user);

        user.password = undefined;
        return user;
    }

    async signIn(userData: SignInUserDto): Promise<{ success: boolean, accessToken: string, loginUser: UsersModel }> {
        const { email, password } = userData;
        const user = await this.usersRepository.findOne({ where: { email } });

        if (user && await bcrypt.compare(password, user.password)) {
            const payload = { email };
            const accessToken = this.jwtService.sign(payload);
            return { success: true, accessToken, loginUser: user };
        } else {
            throw new UnauthorizedException();
        }
    }


}
