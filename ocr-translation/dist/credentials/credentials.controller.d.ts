import { CredentialsService } from './credentials.service';
import { CredentialType } from './credentials.entity';
export declare class CredentialsController {
    private readonly credentialsService;
    constructor(credentialsService: CredentialsService);
    create(createCredentialDto: {
        type: CredentialType;
        name: string;
        config: Record<string, any>;
        description?: string;
    }): Promise<import("./credentials.entity").Credential>;
    findAll(): Promise<import("./credentials.entity").Credential[]>;
    findOne(id: string): Promise<import("./credentials.entity").Credential>;
    findByType(type: CredentialType): Promise<import("./credentials.entity").Credential[]>;
    update(id: string, updateCredentialDto: {
        name?: string;
        config?: Record<string, any>;
        isActive?: boolean;
        description?: string;
    }): Promise<import("./credentials.entity").Credential>;
    remove(id: string): Promise<void>;
}
