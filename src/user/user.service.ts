import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import dayjs from 'dayjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // const createtime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    // createUserDto.createtime = createtime;
    console.log(33, createUserDto);


    // const user = await this.userRepository.save(createUserDto);
    // return this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({
      id: id,
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updatetime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    updateUserDto.updatetime = updatetime;
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });
    if (!user) {
      throw new Error(`未找到该用户数据`);
    }
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error(`未找到该用户数据`);
    }
    return this.userRepository.remove(user);
  }
}
