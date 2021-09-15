import { IsNotEmpty } from 'class-validator';

export class UpdateTaskDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  desc: string;
}
