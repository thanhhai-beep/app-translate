import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './entities/setting.entity';
import { CreateSettingDto, UpdateSettingDto } from './dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private settingsRepository: Repository<Setting>,
  ) {}

  async findAll(): Promise<Setting[]> {
    return this.settingsRepository.find();
  }

  async create(createSettingDto: CreateSettingDto): Promise<Setting> {
    const setting = this.settingsRepository.create(createSettingDto);
    return this.settingsRepository.save(setting);
  }

  async update(updateSettingDto: UpdateSettingDto): Promise<Setting[]> {
    const settings = await this.findAll();
    const updatedSettings = settings.map(setting => {
      if (updateSettingDto[setting.key]) {
        setting.value = updateSettingDto[setting.key];
      }
      return setting;
    });
    return this.settingsRepository.save(updatedSettings);
  }
} 