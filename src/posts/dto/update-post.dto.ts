import { IsNotEmpty } from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  desc: string;
}
