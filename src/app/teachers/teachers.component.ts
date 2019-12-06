import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OperationsService } from 'app/services/operations.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

  teachers : Observable<any>;

  constructor(private operationsService: OperationsService) { }

  ngOnInit() {
    this.teachers = this.operationsService.getOperation('teachers').pipe(map((res : any) => {return res.response;}));
    this.teachers.subscribe(result => {
      console.log('Result', result);
    })
  }

}
