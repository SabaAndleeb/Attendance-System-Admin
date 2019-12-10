import { Component, OnInit } from '@angular/core';
import { OperationsService } from 'app/services/operations.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-degree',
  templateUrl: './add-degree.component.html',
  styleUrls: ['./add-degree.component.scss']
})
export class AddDegreeComponent implements OnInit {

  private alertData : any;
  private form : FormGroup;

  constructor(private operationsService: OperationsService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name : ['', Validators.required],
    });
  }

  addDegree(){
    const newDegree= this.operationsService.postOperation('add-degree' , this.form.value);
    newDegree.subscribe((result : any) => {
      this.alertData = {};
      if(result.success){
        this.alertData.class = 'alert-success';
        this.alertData.message = 'Degree added successfully.';
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
