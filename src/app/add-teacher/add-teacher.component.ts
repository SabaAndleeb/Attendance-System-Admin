import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { OperationsService } from 'app/services/operations.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit {

  private form : FormGroup;
  private courses : Observable<any>;
  private alertData : any;

  constructor(private formBuilder: FormBuilder,  
              private operationsService: OperationsService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName : ['' , Validators.required],
      lastName  : ['' , Validators.required],
      email : ['' , Validators.required],
      contactNumber : ['' , Validators.required],
      birthDate : ['' , Validators.required],
      location : this.formBuilder.group({
        country : 'Pakistan',
        city : ['islamabad', Validators.required],
        address : ['' , Validators.required],
      }),  
      salary : ['', Validators.required],
      joiningDate: ['', Validators.required],
      qualification : this.formBuilder.group({
        degree : ['', Validators.required],
        programme : ['', Validators.required]
      }),
      assignedCourses : this.formBuilder.array([])  
    });

    this.getCourses();
  }

  getCourses(){
    this.courses = this.operationsService.getOperation('courses');
  }

  onCheckChange(event) {
    const formArray: FormArray = this.form.get('assignedCourses') as FormArray;
  
    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
  
      formArray.controls.forEach((ctrl: FormControl) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
  
        i++;
      });
    }
  }

  addTeacher(){
    const newTeacher = this.operationsService.postOperation('add-teacher' , this.form.value);
    newTeacher.subscribe((result : any) => {
      console.log('Teacher Added Response', result);
      this.alertData = {};
      if(result.success){
        this.alertData.class = 'alert-success';
        this.alertData.message = 'Teacher added successfully.';
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
