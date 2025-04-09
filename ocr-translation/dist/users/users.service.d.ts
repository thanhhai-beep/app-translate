import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { Role } from 'src/auth/enums/role.enum';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    update(id: number, updateUserDto: Partial<UpdateUserDto>): Promise<User>;
    remove(id: string): Promise<void>;
    addRole(id: number, role: Role): Promise<User>;
    removeRole(id: number, role: Role): Promise<User>;
    updatePreferences(id: number, preferences: any): Promise<User>;
}
