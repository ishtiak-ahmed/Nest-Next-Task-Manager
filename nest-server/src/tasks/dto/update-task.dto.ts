import { TaskStatus } from '../task.model';

export class UpdateTask {
  title: string;
  description: string;
  id: string;
  status: TaskStatus;
}
