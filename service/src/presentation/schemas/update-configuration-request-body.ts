import { IsNotEmpty, IsString } from 'class-validator';
export class UpdateConfigurationRequestBody {
  @IsNotEmpty()
  @IsString()
  value: string;
}
