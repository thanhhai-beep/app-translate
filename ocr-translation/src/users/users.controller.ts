import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from '../auth/enums/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createUserDto: {
    email: string;
    username: string;
    password: string;
    roles?: Role[];
    name: string;
    avatar?: string;
    isActive?: boolean;
  }) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateUserDto: {
      email?: string;
      username?: string;
      password?: string;
      roles?: Role[];
      isActive?: boolean;
      avatar?: string;
      preferences?: any;
    },
  ) {
    return this.usersService.update(Number(id), updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Put(':id/roles/add')
  @Roles(Role.ADMIN)
  addRole(
    @Param('id') id: string,
    @Body('role') role: Role,
  ) {
    return this.usersService.addRole(Number(id), role);
  }

  @Put(':id/roles/remove')
  @Roles(Role.ADMIN)
  removeRole(
    @Param('id') id: string,
    @Body('role') role: Role,
  ) {
    return this.usersService.removeRole(Number(id), role);
  }

  @Patch(':id/preferences')
  updatePreferences(
    @Param('id') id: string,
    @Body() preferences: any,
  ) {
    return this.usersService.updatePreferences(Number(id), preferences);
  }
} 