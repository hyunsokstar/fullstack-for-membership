import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { UsersModel } from 'src/users/entities/user.entity';
import { JwtPayload } from './jwt-payload.interface';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private usersRepository;
    constructor(usersRepository: Repository<UsersModel>);
    validate(payload: JwtPayload): Promise<UsersModel>;
}
export {};
