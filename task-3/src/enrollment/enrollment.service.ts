import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CourseService } from '../course/course.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class EnrollmentService {
  constructor(
    private courseService: CourseService,
    @Inject(forwardRef(() => NotificationService)) // Partc
    private notificationService: NotificationService,
  ) {}

  enrollStudent(studentName: string, courseId: string) {
    const course = this.courseService.getCourseById(courseId);
    const notification = this.notificationService.sendNotification(studentName, 'Enrolled!');
    return {
      message: 'Student enrolled successfully',
      student: studentName,
      course: course,
      notification: notification
    };
  }

  getEnrollments() {
    return { message: 'All enrollments fetched', data: [] };
  }
}