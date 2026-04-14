import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TasksService } from '../service/tasks.service';
import { Roles } from '../guard/role.decorator';
import { UsersGuard } from '../guard/tasks.guard';



@Controller('tasks') 
@UseGuards(UsersGuard) // apply the guard to the entire controller
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

//===================================================================================================================================//
  // @desc create Tasks
  // @route POST /pbluic
  // @access Private [Public]
  @Roles(['admin','manager','user']) // this is for the guard to check if the user has the role to access this route
  @Post()
  create(@Body(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true})) Body: CreateTaskDto) {
    return this.tasksService.create(Body);
  }
  //===================================================================================================================================//

  //===================================================================================================================================//
   // @desc getall Tasks
  // @route POST /pbluic 
  // @access Private [admin , manager]
  @Roles(['admin','manager'])
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }
  //===================================================================================================================================//

  //===================================================================================================================================//
  // @desc get one Task by id
  // @route POST /pbluic
  // @access Private [admin , manager]
  @Roles(['admin','manager'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }
//===================================================================================================================================//

//===================================================================================================================================//
  // @desc update Task by id
  // @route POST /pbluic
  // @access Private [admin , manager]
  @Roles(['admin','manager'])
  @Patch(':id') 
  update(@Param('id') id: string, @Body(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true})) Body: UpdateTaskDto) {
    return this.tasksService.update(id, Body);
  }
//===================================================================================================================================//

//===================================================================================================================================//
// @desc delete Task by id
// @route POST /pbluic
// @access Private [admin , manager]
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
//===================================================================================================================================//
}
