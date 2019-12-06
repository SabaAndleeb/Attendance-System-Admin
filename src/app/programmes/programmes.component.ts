import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OperationsService } from 'app/services/operations.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-programmes',
  templateUrl: './programmes.component.html',
  styleUrls: ['./programmes.component.scss']
})
export class ProgrammesComponent implements OnInit {

  private params : any;
  private programmes : Observable<any[]>;

  constructor(private activedRoute : ActivatedRoute ,
              private operationsService : OperationsService) { }

  ngOnInit() {
    this.activedRoute.params.subscribe(( params : any) => {
      this.params = params;
      console.log('Params', this.params);
      if(this.params && this.params.id)
        this.fetchProgrammes();
    });
  }

  fetchProgrammes(){
    this.programmes = this.operationsService.getOperation('degreeProgrammes/'+ this.params.id)
                                            .pipe(map((res : any) => { 
                                              res.response.map(programme => {
                                                programme.class = ['info', 'success', 'warning', 'danger' , 'primary'][Math.floor(Math.random() * 5)];
                                              });
                                              return res.response;
                                            }));

  }

}
