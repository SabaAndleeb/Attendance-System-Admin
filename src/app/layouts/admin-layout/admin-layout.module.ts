import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
import { StudentsComponent } from '../../students/students.component';
import { TeachersComponent } from '../../teachers/teachers.component';
import { ClassesListComponent } from '../../classes-list/classes-list.component';
import { CoursesComponent } from 'app/courses/courses.component';
import { ProgrammesComponent } from 'app/programmes/programmes.component';
import { AttednaceResultComponent } from 'app/attednace-result/attednace-result.component';
import { AddStudentComponent } from 'app/add-student/add-student.component';
import { AddCourseComponent } from 'app/add-course/add-course.component';
import { AddTeacherComponent } from 'app/add-teacher/add-teacher.component';
import { AddClassComponent } from 'app/add-class/add-class.component';
import { ComponentsModule } from 'app/components/components.module';
import { AddDegreeComponent } from 'app/add-degree/add-degree.component';
import { AddProgrammeComponent } from 'app/add-programme/add-programme.component';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    StudentsComponent,
    TeachersComponent,
    ClassesListComponent,
    CoursesComponent,
    ProgrammesComponent,
    AttednaceResultComponent,
    AddStudentComponent,
    AddCourseComponent,
    AddTeacherComponent,
    AddClassComponent,
    AddDegreeComponent,
    AddProgrammeComponent
  ]
})

export class AdminLayoutModule {}
