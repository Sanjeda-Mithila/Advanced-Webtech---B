import { Controller, Get, Post, Put, Patch, Delete, Body, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course-dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { extname } from 'path';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  getAllcourses() { return this.courseService.getAllCourses(); }

  @Get(':id')
  getById(@Param('id') id: string) { return this.courseService.getCourseById(id); }

  @Post()
  create(@Body() dto: CreateCourseDto) { return this.courseService.createCourse(dto); }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.courseService.updateCourse(id, dto);
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.courseService.patchCourse(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) { return this.courseService.deleteCourse(id); }

  // ফাইল আপলোড রাউট [cite: 97, 101]
  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) { // [cite: 97]
        return cb(new Error('Only JPG, JPEG, PNG, and PDF files are allowed!'), false);
      }
      cb(null, true);
    },
    limits: { fileSize: 2 * 1024 * 1024 } // সর্বোচ্চ ২ মেগাবাইট [cite: 97, 135]
  }))
  uploadFile(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.courseService.uploadCourseMaterial(id, file);
  }
}