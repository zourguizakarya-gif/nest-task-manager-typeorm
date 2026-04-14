import { Module } from '@nestjs/common';
import { TasksController } from './controller/tasks.controller';
import { TasksService } from './service/tasks.service';
import { Tasks } from './entites/tasks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
const scehema = [Tasks]; // it get all table in entity 
@Module({
  imports: [TypeOrmModule.forFeature(scehema)],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
