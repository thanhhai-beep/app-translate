import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, roles, ...rest } = createUserDto;

    // Check if user already exists
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = this.usersRepository.create({
      ...rest,
      email,
      password: hashedPassword,
      roles: roles || [Role.USER],
    });

    // Save user
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: Partial<UpdateUserDto>): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async addRole(id: number, role: Role): Promise<User> {
    const user = await this.findOne(id);
    
    if (!user.roles.includes(role)) {
      user.roles.push(role);
      return this.usersRepository.save(user);
    }
    
    return user;
  }

  async removeRole(id: number, role: Role): Promise<User> {
    const user = await this.findOne(id);
    
    const index = user.roles.indexOf(role);
    if (index > -1) {
      user.roles.splice(index, 1);
      return this.usersRepository.save(user);
    }
    
    return user;
  }

  async updatePreferences(id: number, preferences: any): Promise<User> {
    const user = await this.findOne(id);
    user.preferences = preferences;
    return this.usersRepository.save(user);
  }
} 