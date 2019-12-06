import { Component, OnInit } from '@angular/core';
import { OperationsService } from 'app/services/operations.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.scss']
})
export class ClassesListComponent implements OnInit {

  classes : Observable<any>;

  constructor(private operationsService: OperationsService) { }

  ngOnInit() {
    this.classes = this.operationsService.getOperation('classes')
                                        .pipe(map((res :any) => { 
                                          res.response.map(_class => {
                                            _class.class = ['info', 'success', 'warning', 'danger' , 'primary'][Math.floor(Math.random() * 5)];
                                          });
                                          return res.response;
                                        }));
  }

}
