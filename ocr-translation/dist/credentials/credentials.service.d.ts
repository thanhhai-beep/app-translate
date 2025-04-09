import { Repository } from 'typeorm';
import { Credential, CredentialType } from './credentials.entity';
export declare class CredentialsService {
    private credentialsRepository;
    constructor(credentialsRepository: Repository<Credential>);
    create(createCredentialDto: {
        type: CredentialType;
        name: string;
        config: Record<string, any>;
        description?: string;
    }): Promise<Credential>;
    findAll(): Promise<Credential[]>;
    findOne(id: string): Promise<Credential>;
    findByType(type: CredentialType): Promise<Credential[]>;
    update(id: string, updateCredentialDto: {
        name?: string;
        config?: Record<string, any>;
        isActive?: boolean;
        description?: string;
    }): Promise<Credential>;
    remove(id: string): Promise<void>;
    getActiveCredential(type: CredentialType): Promise<Credential | null>;
}
