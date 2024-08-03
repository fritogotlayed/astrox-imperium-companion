import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CharacterService as CoreCharacterService } from '../../core/character-service';

@Injectable()
export class CharacterService extends CoreCharacterService {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(dataSource);
  }
}
