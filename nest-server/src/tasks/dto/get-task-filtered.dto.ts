import { TaskStatus } from '../task.model';

export class GetTaskFilteredDTO {
  status: TaskStatus;
  search: string;
}
