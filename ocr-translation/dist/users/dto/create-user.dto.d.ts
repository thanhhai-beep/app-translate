import { Role } from 'src/auth/enums/role.enum';
export declare class CreateUserDto {
    email: string;
    username: string;
    password: string;
    roles?: Role[];
    name: string;
    avatar?: string;
    isActive?: boolean;
}
export declare class UpdateUserDto extends CreateUserDto {
}
