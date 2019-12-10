import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { OperationsService } from 'app/services/operations.service';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContentObserver } from '@angular/cdk/observers';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent implements OnInit {

  private form: FormGroup;
  private degrees: Observable<any>;
  private programmes: Observable<any>;
  private students: Observable<any>;
  private teachers: Array<any>;
  private courses: Array<any>;
  private alertData: any;

  constructor(private formBuilder: FormBuilder,
    private operationsService: OperationsService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      degree: ['', Validators.required],
      programme: ['', Validators.required],
      courses: this.formBuilder.array( [] ),
      students: this.formBuilder.array([]),
      section: '',
      part: 0,
      semester: 0,
      year : ['', Validators.required]
    });
    
    
    this.getCoursesData();

    this.getStudents();

    this.getDegrees();
    this.form.get('degree').valueChanges.subscribe((selectedDegree: any) => {
      this.getDegreeProgrammes(selectedDegree);
    });
  }

  addStudentToForm() {
    return new FormControl('', Validators.required);
  }

  addCourse() {
    let courses = <FormArray>this.form.controls.courses;
    courses.push(
      this.formBuilder.group({
        course:  [this.courses[0]._id, Validators.required],
        teacher: [this.teachers[0]._id, Validators.required],
      })
    );
  }

  removeCourse(index){
    let courses = <FormArray>this.form.controls.courses;
    courses.removeAt(index);
  }

  getDegrees() {
    this.degrees = this.operationsService.getOperation('degree');
    this.degrees.subscribe((result: any) => {
      if (result.response && result.response.length > 0) {
        const degreeId = result.response[0]._id;
        this.form.get('degree').patchValue(degreeId);
        this.getDegreeProgrammes(degreeId);
      }
    });
  }

  getCoursesData() {
    const teachers = this.operationsService.getOperation('teachers');
    const courses = this.operationsService.getOperation('courses');
    forkJoin([teachers , courses]).subscribe( (response : any ) => {
      if(response && response.length > 0){
        this.teachers = response[0].response;
        this.courses  = response[1].response;
        this.addCourse();
      }
    });    
  }

  getStudents(){
    this.students = this.operationsService.getOperation('students');    
  }

  onCheckChange(event) {
  const formArray: FormArray = this.form.get('students') as FormArray;

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

 

  getDegreeProgrammes(degreeId) {
    this.programmes = this.operationsService.getOperation('degreeProgrammes/' + degreeId);
    this.degrees.subscribe((result: any) => {
      if (result.response && result.response.length > 0)
        this.form.get('programme').patchValue(result.response[0]._id);
      else
        this.form.get('programme').patchValue("");
    });
  }

  addClass() {
    const newClass = this.operationsService.postOperation('add-student', this.form.value);
    newClass.subscribe((result: any) => {
      console.log('Class Added Response', result);
      this.alertData = {};
      if (result.success) {
        this.alertData.class = 'alert-success';
        this.alertData.message = 'Class added successfully.';
      }
      else {
        this.alertData.class = 'alert-danger';
        this.alertData.message = 'Sorry! something went wrong.';
      }
      setTimeout(() => {
        this.alertData = undefined;
        if (result.success)
          this.form.reset();
      }, 3000);
    });
  }

}
