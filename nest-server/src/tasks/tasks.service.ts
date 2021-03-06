import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilteredDTO } from './dto/get-task-filtered.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilter(filteredDTO: GetTaskFilteredDTO): Task[] {
    let tasks = this.getAllTasks();
    const { status, search } = filteredDTO;
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        return task.title.includes(search) || task.description.includes(search);
      });
    }
    return tasks;
  }

  getTaskByID(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }

    return found;
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
    const found = this.getTaskByID(id);

    const tasks = this.tasks.filter((task) => task.id !== found.id);
    this.tasks = [...tasks];
  }

  // My Solution
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   let updated;
  //   const updatedTask = this.tasks.map((task) => {
  //     if (task.id === id) {
  //       updated = { ...task, status };
  //       return updated;
  //     }
  //     return task;
  //   });
  //   this.tasks = [...updatedTask];
  //   return updated;
  // }
  // Ariel's Solution
  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskByID(id);
    task.status = status;
    return task;
  }
}
