import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { LogserveService } from '../logserve.service';
import { groupBy } from 'rxjs/internal/operators/groupBy';
import * as firebase from 'firebase';

@Component({
  selector: 'app-notecard',
  templateUrl: './notecard.component.html',
  styleUrls: ['./notecard.component.css']
})
export class NotecardComponent implements OnInit {
  notes: Observable<any>;
  title: string;
  brief: string;
  updatenid: string;
  u_brief: string;
  u_title: string;
  constructor(private router: Router, public db: AngularFireDatabase, private ls: LogserveService) {
  }

  ngOnInit(): void {
    this.notes = this.db.list('test', ref => ref.orderByChild('u_id').equalTo(parseInt(this.ls.userinfo.id))).valueChanges();
  }
  add(form: NgForm) {
    var date = new Date();
    var timestamp = date.getTime();
    var nid = (parseInt(this.ls.userinfo.id)).toString() + timestamp;
    var insertdata = this.db.list('test').push({
      n_id: nid,
      title: this.title,
      brief: this.brief,
      u_id: parseInt(this.ls.userinfo.id)
    }
    );
    form.resetForm();
    this.router.navigate(['/login/notecard']);
  }


  delete(noteid: string) {
    if (confirm("Are you sure to delete this note?")) {
      var ref = firebase.database().ref('test');
      var thekey;
      ref.orderByChild('n_id').equalTo(noteid).on("value", function (snapshot) {
        snapshot.forEach((function (child) {
          thekey = child.key;
          ref.child(thekey).remove();
        }));
      });
    }
  }
  updateid(noteid: string, t:string, b:string) {
    this.updatenid = noteid;
    this.u_title = t;
    this.u_brief = b;
  }
  update() {
    var ref = firebase.database().ref('test');
    var thekey;
    var newvalue = {
      n_id: this.updatenid,
      title: this.u_title,
      brief: this.u_brief,
      u_id: parseInt(this.ls.userinfo.id)

    };
    ref.orderByChild('n_id').equalTo(this.updatenid).on("value", function (snapshot) {
      snapshot.forEach((function (child) {
        thekey = child.key;
        ref.child(thekey).update(newvalue);
      }));
    });
    this.updatenid=null;
    this.u_title=null;
    this.u_brief=null;
    this.router.navigate(['/login/notecard']);
  }
}
