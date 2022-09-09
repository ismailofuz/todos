import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get()
  findAll(){
    return this.appService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string){
    return this.appService.findOne(+id);
  }

  @Post()
  create(@Body() create: CreateTodoDto){
    return this.appService.create(create);
  }

  @Patch(':id')
  update(@Body() update: UpdateTodoDto, @Param('id', ParseIntPipe) id: number){
    return this.appService.update(id, update);
  }

  @Delete(':id')  
  delete(@Param('id') id: string){
    return this.appService.delete(+id);
  }
}
