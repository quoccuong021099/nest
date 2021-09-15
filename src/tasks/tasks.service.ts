import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './task.model';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  getTasksFilter(getTasksFilterDto: GetTasksFilterDto): Task[] {
    const { status, search } = getTasksFilterDto;
    let tasks = this.getTasks();
    if (status) tasks = tasks.filter((item) => item.status === status);
    if (search)
      tasks = tasks.filter((item) => {
        if (
          item.desc.toLowerCase().includes(search.toLowerCase()) ||
          item.title.toLowerCase().includes(search.toLowerCase())
        )
          return true;
        else return false;
      });
    return tasks;
  }

  getTaskById(id: string): Task {
    const find = this.tasks.find((item) => item.id === id);
    if (!find) throw new NotFoundException(`Task ${id}`);
    return find;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, desc } = createTaskDto;
    const newTask = {
      id: uuid(),
      title,
      desc,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  deleteTask(id: string): void {
    const find = this.getTaskById(id);
    if (!find) throw new NotFoundException(`Task ${id}`);
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const find = this.getTaskById(id);
    if (!find) throw new NotFoundException(`Task ${id}`);
    find.status = status;
    return find;
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
    const { title, desc } = updateTaskDto;
    const find = this.getTaskById(id);
    if (!find) throw new NotFoundException(`Task ${id}`);
    find.title = title;
    find.desc = desc;
    return find;
  }
}
