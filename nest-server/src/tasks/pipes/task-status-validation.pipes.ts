import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidation implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ];
  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isValidStatus(value)) {
      throw new BadRequestException(`"${value}" is an invalid status value.`);
    }

    return value;
  }

  private isValidStatus(status) {
    const idx = this.allowedStatus.indexOf(status);

    return idx !== -1;
  }
}
