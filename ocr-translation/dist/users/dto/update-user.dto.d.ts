import { Role } from '../../auth/enums/role.enum';
export declare class UpdateUserDto {
    email?: string;
    username?: string;
    password?: string;
    roles?: Role[];
    isActive?: boolean;
    avatar?: string;
    preferences?: {
        language?: string;
        theme?: string;
        notifications?: boolean;
        [key: string]: any;
    };
}
