import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialType } from './credentials.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('credentials')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  create(@Body() createCredentialDto: {
    type: CredentialType;
    name: string;
    config: Record<string, any>;
    description?: string;
  }) {
    return this.credentialsService.create(createCredentialDto);
  }

  @Get()
  findAll() {
    return this.credentialsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.credentialsService.findOne(id);
  }

  @Get('type/:type')
  findByType(@Param('type') type: CredentialType) {
    return this.credentialsService.findByType(type);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCredentialDto: {
      name?: string;
      config?: Record<string, any>;
      isActive?: boolean;
      description?: string;
    },
  ) {
    return this.credentialsService.update(id, updateCredentialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.credentialsService.remove(id);
  }
} 