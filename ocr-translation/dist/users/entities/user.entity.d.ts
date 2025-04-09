import { Role } from '../../auth/enums/role.enum';
export declare class User {
    id: number;
    email: string;
    password: string;
    name: string;
    roles: Role[];
    avatar: string;
    lastLogin: Date;
    isActive: boolean;
    username: string;
    preferences: {
        language?: string;
        theme?: string;
        notifications?: boolean;
        [key: string]: any;
    };
    createdAt: Date;
    updatedAt: Date;
}
