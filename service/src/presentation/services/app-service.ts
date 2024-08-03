import { Injectable } from '@nestjs/common';
import { AppService as CoreAppService } from '../../core/app-service';

@Injectable()
export class AppService extends CoreAppService {}
