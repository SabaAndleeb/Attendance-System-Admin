import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { StudentsComponent } from '../../students/students.component';
import { TeachersComponent } from '../../teachers/teachers.component';
import { CoursesComponent } from '../../courses/courses.component';
import { ProgrammesComponent } from '../../programmes/programmes.component';
import { ClassesListComponent } from 'app/classes-list/classes-list.component';
import { AttednaceResultComponent } from 'app/attednace-result/attednace-result.component';
import { AddStudentComponent } from 'app/add-student/add-student.component';
import { AddCourseComponent } from 'app/add-course/add-course.component';
import { AddClassComponent } from 'app/add-class/add-class.component';
import { AddDegreeComponent } from 'app/add-degree/add-degree.component';
import { AddProgrammeComponent } from 'app/add-programme/add-programme.component';

export const AdminLayoutRoutes: Routes = [
    { path : 'dashboard',      component: DashboardComponent },
    { path : 'students', component : StudentsComponent },
    { path : 'add-student', component : AddStudentComponent },
    { path : 'classes', component  : ClassesListComponent },
    { path : 'add-class', component : AddClassComponent },
    { path : 'teachers', component : TeachersComponent },
    { path : 'courses' , component : CoursesComponent  },
    { path : 'add-course', component : AddCourseComponent },
    { path : 'degreeProgrammes/:id/:name' , component : ProgrammesComponent },
    { path : 'attendance-result/:id' , component : AttednaceResultComponent },
    { path : 'add-degree', component : AddDegreeComponent },
    { path : 'add-programme', component : AddProgrammeComponent },

];
