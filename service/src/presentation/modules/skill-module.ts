import { Module } from '@nestjs/common';
import { SkillController } from '../controllers/skill-controller';
import { SkillService } from '../services/skill-service';
import { SkillService as CoreSkillService } from '../../core/skill-service';

@Module({
  imports: [],
  controllers: [SkillController],
  providers: [
    {
      provide: CoreSkillService,
      useClass: SkillService,
    },
  ],
})
export class SkillModule {}
