import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTask(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string) {
    const tasks = this.tasks.filter((task) => task.id !== id);
    this.tasks = [...tasks];
    return 'success';
  }

  updateTask(id: string, status: TaskStatus): Task {
    let updated;
    const updatedTask = this.tasks.map((task) => {
      if (task.id === id) {
        updated = { ...task, status };
        return updated;
      }
      return task;
    });
    this.tasks = [...updatedTask];
    return updated;
  }
}