import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { OperationsService } from 'app/services/operations.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  private form : FormGroup;
  private degrees : Observable<any>;
  private programmes : Observable<any>;
  private alertData : any;

  constructor(private formBuilder: FormBuilder,  
              private operationsService: OperationsService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName : ['' , Validators.required],
      lastName  : ['' , Validators.required],
      userName  : ['' , Validators.required],
      email : ['' , Validators.required],
      contactNumber : ['' , Validators.required],
      registrationNum : ['' , Validators.required],
      rollNum : ['' , Validators.required],
      birthDate : ['' , Validators.required],
      classInfo : this.formBuilder.group({
        degree : ['' , Validators.required],
        programme : ['' , Validators.required],
      }),
      location : this.formBuilder.group({
        country : 'Pakistan',
        city : ['', Validators.required],
        address : ['' , Validators.required],
      })  

    });
    this.getData();

    this.form.get('classInfo.degree').valueChanges.subscribe((selectedDegree : any) => {
      this.getDegreeProgrammes(selectedDegree);
    });
  }

  getData(){
    this.degrees = this.operationsService.getOperation('degree');
    this.degrees.subscribe((result : any) => {
      if(result.response && result.response.length > 0){
        const degreeId = result.response[0]._id;
        this.form.get('classInfo.degree').patchValue(degreeId);
        this.getDegreeProgrammes(degreeId);
      }
    });  
  }

  getDegreeProgrammes(degreeId){
    this.programmes = this.operationsService.getOperation('degreeProgrammes/'+ degreeId);
    this.degrees.subscribe((result : any) => {
      if(result.response && result.response.length > 0)
        this.form.get('classInfo.programme').patchValue(result.response[0]._id);
      else
        this.form.get('classInfo.programme').patchValue("");
    });  
  }


  addStudent(){
    const newCourse = this.operationsService.postOperation('add-student' , this.form.value);
    newCourse.subscribe((result : any) => {
      console.log('Student Added Response', result);
      this.alertData = {};
      if(result.success){
        this.alertData.class = 'alert-success';
        this.alertData.message = 'Student added successfully.';
      }
      else {
        this.alertData.class = 'alert-danger';
        this.alertData.message = 'Sorry! something went wrong.';
      }
      setTimeout(() => {
        this.alertData = {};
        if(result.success)
          this.form.reset();
      }, 3000);
    });  
  }

}
