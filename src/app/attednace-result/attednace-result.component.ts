import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OperationsService } from 'app/services/operations.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attednace-result',
  templateUrl: './attednace-result.component.html',
  styleUrls: ['./attednace-result.component.scss']
})
export class AttednaceResultComponent implements OnInit {

  attendances : Observable<any>;

  constructor(private activatedRoute : ActivatedRoute, private operationsService: OperationsService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(( params : any) => {
      console.log('Class ID', params);
      if(params && params.id)
        this.fetchClassAttendance(params.id);
    });    
  }

  fetchClassAttendance(id){
    this.attendances = this.operationsService.getOperation('attendance?classId='+ id).pipe(map((res : any) => { return res.response; }));
  }

}
