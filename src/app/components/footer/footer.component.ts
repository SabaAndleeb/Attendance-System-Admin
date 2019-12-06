import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentDate : Date = new Date();
  routes : Array<any> = [ 
  { route : '/' , title : 'Dashboard'} ,
  { route : '/students' , title : 'Students'} ,
  { route : '/teachers' , title : 'Teachers'} ,
  { route : '/courses'  , title : 'Courses'} ]
  
  constructor() { }

  ngOnInit() {
  }

}
