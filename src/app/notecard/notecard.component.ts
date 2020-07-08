import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { LogserveService } from '../logserve.service';
import { groupBy } from 'rxjs/internal/operators/groupBy';

@Component({
  selector: 'app-notecard',
  templateUrl: './notecard.component.html',
  styleUrls: ['./notecard.component.css']
})
export class NotecardComponent implements OnInit {
  notes: Observable<any>;
  title:string;
  brief:string;
  constructor(private router: Router,public db: AngularFireDatabase,private ls: LogserveService) {
   }

  ngOnInit(): void {
    this.notes=this.db.list('test', ref=>ref.orderByChild('u_id').equalTo(parseInt(this.ls.userinfo.id))).valueChanges();
  }
add(form: NgForm){
  this.db.list('test').push({
    title:this.title,
    brief:this.brief,
    u_id:parseInt(this.ls.userinfo.id)
  });
  form.resetForm();
  this.router.navigate(['/login/notecard']);
}
}
