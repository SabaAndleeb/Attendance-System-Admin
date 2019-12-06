import { Component, OnInit } from '@angular/core';
import { OperationsService } from 'app/services/operations.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses : Observable<any>;

  constructor(private operationsService: OperationsService) { }

  ngOnInit() {
    this.courses = this.operationsService.getOperation('courses');
  }


}
