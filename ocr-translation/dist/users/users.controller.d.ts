import { UsersService } from './users.service';
import { Role } from '../auth/enums/role.enum';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: {
        email: string;
        username: string;
        password: string;
        roles?: Role[];
        name: string;
        avatar?: string;
        isActive?: boolean;
    }): Promise<import("./entities/user.entity").User>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    update(id: string, updateUserDto: {
        email?: string;
        username?: string;
        password?: string;
        roles?: Role[];
        isActive?: boolean;
        avatar?: string;
        preferences?: any;
    }): Promise<import("./entities/user.entity").User>;
    remove(id: string): Promise<void>;
    addRole(id: string, role: Role): Promise<import("./entities/user.entity").User>;
    removeRole(id: string, role: Role): Promise<import("./entities/user.entity").User>;
    updatePreferences(id: string, preferences: any): Promise<import("./entities/user.entity").User>;
}
