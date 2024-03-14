import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersModel } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>,
  ) { }

  async createOneUser(createUserDto: CreateUserDto) {
    try {
      const newUser = this.usersRepository.create(createUserDto);
      await this.usersRepository.save(newUser);
      return { success: true, message: 'add user success' };
    } catch (error) {
      return { success: false, message: 'add user failed' };
    }
  }

  async findUsersWithPagination(pageNum: number, perPage: number) {
    const skip = (pageNum - 1) * perPage;
    const usersList = await this.usersRepository.find({
      skip,
      take: perPage,
    });

    const totalCount = await this.usersRepository.count();

    return {
      usersList,
      totalCount,
      perPage,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
