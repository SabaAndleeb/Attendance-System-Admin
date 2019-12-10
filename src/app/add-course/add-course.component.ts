import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { OperationsService } from 'app/services/operations.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  private form : FormGroup;
  private degrees : Observable<any>;
  private programmes : Observable<any>;
  private alertData: any;
  
  constructor(private formBuilder: FormBuilder,  
              private operationsService: OperationsService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name : ['' , Validators.required]
    });
  }


  addCourse(){
    const newCourse = this.operationsService.postOperation('add-course' , this.form.value);
    newCourse.subscribe((result : any) => {
      this.alertData = {};
      if(result.success){
        this.alertData.class = 'alert-success';
        this.alertData.message = 'Course added successfully.';
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
