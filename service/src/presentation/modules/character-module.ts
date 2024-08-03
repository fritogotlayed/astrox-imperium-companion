import { Module } from '@nestjs/common';
import { CharacterController } from '../controllers/character-controller';
import { CharacterService } from '../services/character-service';
import { CharacterService as CoreCharacterService } from '../../core/character-service';

@Module({
  imports: [],
  controllers: [CharacterController],
  providers: [
    {
      provide: CoreCharacterService,
      useClass: CharacterService,
    },
  ],
})
export class CharacterModule {}
