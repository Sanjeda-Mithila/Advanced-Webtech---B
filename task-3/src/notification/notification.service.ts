import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { EnrollmentService } from '../enrollment/enrollment.service';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(forwardRef(() => EnrollmentService))
    private enrollmentService: EnrollmentService,
  ) {}

  sendNotification(studentName: string, message: string) {
    return { student: studentName, message: message, status: 'Sent' };
  }

  checkEnrollmentAndNotify(studentName: string, courseId: string) {
    return this.enrollmentService.getEnrollments();
  }
}