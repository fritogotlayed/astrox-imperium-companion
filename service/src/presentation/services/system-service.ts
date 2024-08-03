import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SystemService as CoreSystemService } from '../../core/system-service';

@Injectable()
export class SystemService extends CoreSystemService {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(dataSource);
  }
}
