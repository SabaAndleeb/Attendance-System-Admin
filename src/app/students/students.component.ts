import { Component, OnInit } from '@angular/core';
import { OperationsService } from 'app/services/operations.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  students : Observable<any>;

  constructor(private operationsService: OperationsService) { }

  ngOnInit() {
    this.students = this.operationsService.getOperation('students');
  }

}
