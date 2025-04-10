import { SettingsService } from './settings.service';
import { CreateSettingDto, UpdateSettingDto } from './dto';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    findAll(): Promise<import("./entities/setting.entity").Setting[]>;
    create(createSettingDto: CreateSettingDto): Promise<import("./entities/setting.entity").Setting>;
    update(updateSettingDto: UpdateSettingDto): Promise<import("./entities/setting.entity").Setting[]>;
}
