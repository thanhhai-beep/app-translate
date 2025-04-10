import { Repository } from 'typeorm';
import { Setting } from './entities/setting.entity';
import { CreateSettingDto, UpdateSettingDto } from './dto';
export declare class SettingsService {
    private settingsRepository;
    constructor(settingsRepository: Repository<Setting>);
    findAll(): Promise<Setting[]>;
    create(createSettingDto: CreateSettingDto): Promise<Setting>;
    update(updateSettingDto: UpdateSettingDto): Promise<Setting[]>;
}
