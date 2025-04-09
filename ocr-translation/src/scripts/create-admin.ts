import { hash } from 'bcryptjs';
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { Role } from '../auth/enums/role.enum';

dotenv.config();

async function createAdmin() {
  const configService = new ConfigService();
  
  const dataSource = new DataSource({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  });

  await dataSource.initialize();

  const userRepository = dataSource.getRepository(User);

  const adminExists = await userRepository.findOne({
    where: { email: 'admin@example.com' },
  });

  if (!adminExists) {
    const password = 'password123';
    const hashedPassword = await hash(password, 10);
    const adminData: Partial<User> = {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin',
      roles: [Role.ADMIN],
      isActive: true,
    };

    const admin = userRepository.create(adminData);
    await userRepository.save(admin);
    console.log('Admin user created successfully');
  } else {
    console.log('Admin user already exists');
  }

  await dataSource.destroy();
}

createAdmin().catch((error) => {
  console.error('Error creating admin user:', error);
  process.exit(1);
}); 