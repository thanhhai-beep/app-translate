import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credential, CredentialType } from './credentials.entity';

@Injectable()
export class CredentialsService {
  constructor(
    @InjectRepository(Credential)
    private credentialsRepository: Repository<Credential>,
  ) {}

  async create(createCredentialDto: {
    type: CredentialType;
    name: string;
    config: Record<string, any>;
    description?: string;
  }): Promise<Credential> {
    const credential = this.credentialsRepository.create(createCredentialDto);
    return this.credentialsRepository.save(credential);
  }

  async findAll(): Promise<Credential[]> {
    return this.credentialsRepository.find();
  }

  async findOne(id: string): Promise<Credential> {
    const credential = await this.credentialsRepository.findOne({ where: { id } });
    if (!credential) {
      throw new NotFoundException(`Credential with ID ${id} not found`);
    }
    return credential;
  }

  async findByType(type: CredentialType): Promise<Credential[]> {
    return this.credentialsRepository.find({ where: { type, isActive: true } });
  }

  async update(id: string, updateCredentialDto: {
    name?: string;
    config?: Record<string, any>;
    isActive?: boolean;
    description?: string;
  }): Promise<Credential> {
    const credential = await this.findOne(id);
    Object.assign(credential, updateCredentialDto);
    return this.credentialsRepository.save(credential);
  }

  async remove(id: string): Promise<void> {
    const credential = await this.findOne(id);
    await this.credentialsRepository.remove(credential);
  }

  async getActiveCredential(type: CredentialType): Promise<Credential | null> {
    const credentials = await this.findByType(type);
    return credentials.length > 0 ? credentials[0] : null;
  }
} 