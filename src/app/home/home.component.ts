import { Component, OnInit } from '@angular/core';
import { LogserveService } from '../logserve.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedin:boolean;

  constructor(private ls: LogserveService) { }

  ngOnInit(): void {
    this.loggedin=this.ls.isloggedIn;
  }

}
