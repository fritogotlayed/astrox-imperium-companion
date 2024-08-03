import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SkillService as CoreSkillService } from '../../core/skill-service';

@Injectable()
export class SkillService extends CoreSkillService {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(dataSource);
  }
}
