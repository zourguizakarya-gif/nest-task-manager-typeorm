import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Repository } from 'typeorm/repository/Repository.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from '../entites/tasks.entity';
 
@Injectable()
export class TasksService {

  
    constructor(
         @InjectRepository(Tasks) private readonly tasks: Repository<Tasks>) { } 
  //=========================================================================================================================================\\
  //=========================================================================================================================================\\

  async create(body: CreateTaskDto): Promise<Tasks>{
     const task = await this.tasks.create(body); 
    return await this.tasks.save(task);
  }
//=========================================================================================================================================\\
//=========================================================================================================================================\\
  async findAll(): Promise<Tasks[]> {
     const task = await this.tasks.find();
    return task;
  }
//=========================================================================================================================================\\
//=========================================================================================================================================\\
  async findOne(id: string):Promise<Tasks> {
      const task = await this.tasks.findOne({ where: { id:id } });
    if(!task){
        throw new NotFoundException();
    }
    return task;
  }
//=========================================================================================================================================\\ 
//=========================================================================================================================================\\
  async update(id: string, body: UpdateTaskDto):Promise<any> {
    const task = await this.tasks.findOne({ where: { id:id } });
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }
    return this.tasks.save({...task,...body});
  }
//=========================================================================================================================================\\
//=========================================================================================================================================\\
  async remove(id:any):Promise<any> {
    const task = await this.tasks.findOne({ where: { id:id } });
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }
    return this.tasks.delete({  id:id });
  }
//=========================================================================================================================================\\
//=========================================================================================================================================\\ 
}
