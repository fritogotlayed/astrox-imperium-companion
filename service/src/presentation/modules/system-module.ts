import { Module } from '@nestjs/common';
import { SystemController } from '../controllers/system-controller';
import { SystemService } from '../services/system-service';
import { SystemService as CoreSystemService } from '../../core/system-service';

@Module({
  imports: [],
  controllers: [SystemController],
  providers: [
    {
      provide: CoreSystemService,
      useClass: SystemService,
    },
  ],
})
export class SystemModule {}
