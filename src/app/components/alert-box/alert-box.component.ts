import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.scss']
})
export class AlertBoxComponent implements OnInit {

  @Input() alertData : any;

  constructor() { }

  ngOnInit() {
  }

}
