import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperationsService } from 'app/services/operations.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-programme',
  templateUrl: './add-programme.component.html',
  styleUrls: ['./add-programme.component.scss']
})
export class AddProgrammeComponent implements OnInit {

  private programmes : Observable<any>;
  private form: FormGroup;
  private alertData : any;
  private params : any = {};

  constructor(private activatedRoute : ActivatedRoute,
              private formBuilder: FormBuilder,
              private operationsService: OperationsService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(( params : any) => {
      console.log('Params', params);
      if(params && params.id) {
        this.params = params;
        this.initForm();
      }
    });   
  }

  initForm(){
    this.form = this.formBuilder.group({
      name : ['', Validators.required],
      degree : [this.params.id],
      duration : ['', Validators.required],
      isSemesterSystem : [true , Validators.required]
    });
  }

  onChange(event){
    if(event.target.value == 'yes')
      this.form.get('isSemesterSystem').patchValue(true);
    else
      this.form.get('isSemesterSystem').patchValue(false);
  }

  addProgramme(){
    const newProgramme = this.operationsService.postOperation('add-programme' , this.form.value);
    newProgramme.subscribe((result : any) => {
      this.alertData = {};
      if(result.success){
        this.alertData.class = 'alert-success';
        this.alertData.message = 'Programme added successfully.';
      }
      else {
        this.alertData.class = 'alert-danger';
        this.alertData.message = 'Sorry! something went wrong.';
      }

      setTimeout(() => {
        this.alertData = undefined;
        if(result.success)
          this.form.reset();
      }, 3000);
    });  
  }  
}
