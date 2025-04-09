"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const dotenv = require("dotenv");
const config_1 = require("@nestjs/config");
const role_enum_1 = require("../auth/enums/role.enum");
dotenv.config();
async function createAdmin() {
    const configService = new config_1.ConfigService();
    const dataSource = new typeorm_1.DataSource({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    });
    await dataSource.initialize();
    const userRepository = dataSource.getRepository(user_entity_1.User);
    const adminExists = await userRepository.findOne({
        where: { email: 'admin@example.com' },
    });
    if (!adminExists) {
        const password = 'password123';
        const hashedPassword = await (0, bcryptjs_1.hash)(password, 10);
        const adminData = {
            email: 'admin@example.com',
            password: hashedPassword,
            name: 'Admin',
            roles: [role_enum_1.Role.ADMIN],
            isActive: true,
        };
        const admin = userRepository.create(adminData);
        await userRepository.save(admin);
        console.log('Admin user created successfully');
    }
    else {
        console.log('Admin user already exists');
    }
    await dataSource.destroy();
}
createAdmin().catch((error) => {
    console.error('Error creating admin user:', error);
    process.exit(1);
});
//# sourceMappingURL=create-admin.js.map