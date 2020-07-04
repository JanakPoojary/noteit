import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notecard',
  templateUrl: './notecard.component.html',
  styleUrls: ['./notecard.component.css']
})
export class NotecardComponent implements OnInit {
  notes:Array<string>;
  note:string;
  title:Array<string>;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.notes=["do this","do that","do whatever", "do nothing"];
    this.title=["Note1", "note2", "note3", "note4", "note5","nate6","note7","note8"];
  }
add(){
  this.title.push(this.note);
  console.log(this.title);
  this.router.navigate(['/login/home']);
}
caller(){
  return this.title.reverse();
}
}
