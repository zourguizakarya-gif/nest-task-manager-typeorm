import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'title must be a string' })
  @IsNotEmpty({ message: 'title is required' })
  title: string;

  @IsString({ message: 'description must be a string' })
  @IsOptional()
  description?: string;

  @IsBoolean({ message: 'completed must be true or false' })
  @IsOptional()
  completed?: boolean;
}