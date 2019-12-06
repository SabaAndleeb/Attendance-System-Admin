import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { OperationsService } from 'app/services/operations.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent implements OnInit {

  private form : FormGroup;
  private degrees : Observable<any>;
  private programmes : Observable<any>;
  private teachers : Observable<any>;
  private courses : Observable<any>;
  private alertData : any;

  constructor(private formBuilder: FormBuilder,  
              private operationsService: OperationsService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      degree : ['' , Validators.required],
      programme : ['' , Validators.required],
      courses : this.formBuilder.array([ this.addCourses() ]),
      students : this.formBuilder.array([ this.addStudentToForm() ]),  
      section : '',
      part : 0,
      semester : 0, 
    });
    this.getDegrees();
    this.getcoursesData();
    this.form.get('degree').valueChanges.subscribe((selectedDegree : any) => {
      this.getDegreeProgrammes(selectedDegree);
    });
  }

  addStudentToForm(){
    return new FormControl('', Validators.required);
  }

  addCourses(){
    return this.formBuilder.group({
      course : ['' , Validators.required],
      teacher : ['' , Validators.required],
    })
  }

  getDegrees(){
    this.degrees = this.operationsService.getOperation('degree');
    this.degrees.subscribe((result : any) => {
      if(result.response && result.response.length > 0){
        const degreeId = result.response[0]._id;
        this.form.get('degree').patchValue(degreeId);
        this.getDegreeProgrammes(degreeId);
      }
    });  
  }

  getcoursesData(){
    this.teachers = this.operationsService.getOperation('teachers');    
    this.courses =  this.operationsService.getOperation('courses');    
  }

  getDegreeProgrammes(degreeId){
    this.programmes = this.operationsService.getOperation('degreeProgrammes/'+ degreeId);
    this.degrees.subscribe((result : any) => {
      if(result.response && result.response.length > 0)
        this.form.get('programme').patchValue(result.response[0]._id);
      else
        this.form.get('programme').patchValue("");
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
