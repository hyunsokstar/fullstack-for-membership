import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersModel } from './entities/user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<UsersModel>);
    createOneUser(createUserDto: CreateUserDto): Promise<{
        success: boolean;
        message: string;
    }>;
    findUsersWithPagination(pageNum: number, perPage: number): Promise<{
        usersList: UsersModel[];
        totalCount: number;
        perPage: number;
    }>;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
