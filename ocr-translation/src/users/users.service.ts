import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from '../auth/enums/role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: {
    email: string;
    username: string;
    password: string;
    roles?: Role[];
  }): Promise<User> {
    // Check if user with email already exists
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email }
    });
    
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = this.usersRepository.create({
      ...createUserDto,
      roles: createUserDto.roles || [Role.USER],
    });

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id }
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email }
    });
  }

  async update(id: string, updateUserDto: {
    email?: string;
    username?: string;
    password?: string;
    roles?: Role[];
    isActive?: boolean;
    avatar?: string;
    preferences?: any;
  }): Promise<User> {
    const user = await this.findOne(id);
    
    // If email is being updated, check if it's already taken
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.findByEmail(updateUserDto.email);
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }
    }
    
    // If password is being updated, hash it
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }

  async addRole(id: string, role: Role): Promise<User> {
    const user = await this.findOne(id);
    
    if (!user.roles.includes(role)) {
      user.roles = [...user.roles, role];
      return this.usersRepository.save(user);
    }
    
    return user;
  }

  async removeRole(id: string, role: Role): Promise<User> {
    const user = await this.findOne(id);
    
    if (user.roles.includes(role)) {
      user.roles = user.roles.filter(r => r !== role);
      return this.usersRepository.save(user);
    }
    
    return user;
  }

  async updatePreferences(id: string, preferences: any): Promise<User> {
    const user = await this.findOne(id);
    user.preferences = { ...user.preferences, ...preferences };
    return this.usersRepository.save(user);
  }
} 