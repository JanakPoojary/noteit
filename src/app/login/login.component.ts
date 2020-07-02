import { Component, OnInit } from '@angular/core';
import { GloginService } from '../glogin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  guser:any;
  constructor(private glog:GloginService){}
  async ngOnInit(){
    if (await this.glog.checkIfUserAuthenticated()) {
      this.glog.user = this.glog.authInstance.currentUser.get();
      this.guser=this.glog.user;
    }
    
  }
  signin(){
    this.glog.authenticate();
  }
  // public gapiSetup: boolean = false; // marks if the gapi library has been loaded
  // public authInstance: gapi.auth2.GoogleAuth;
  // public error: string;
  // public user: gapi.auth2.GoogleUser;

  // async ngOnInit(){
  //   if (await this.checkIfUserAuthenticated()) {
  //     this.user = this.authInstance.currentUser.get();
  //   }
    
  // }
  
  // async initGoogleAuth(): Promise<void> {
  //   //  Create a new Promise where the resolve 
  //   // function is the callback passed to gapi.load
  //   const pload = new Promise((resolve) => {
  //     gapi.load('auth2', resolve);
  //   });

  //   // When the first promise resolves, it means we have gapi
  //   // loaded and that we can call gapi.init
  //   return pload.then(async () => {
  //     await gapi.auth2
  //       .init({ client_id: '164287990561-vp3hhskhe77m85pr8qe8nbhka95l591o.apps.googleusercontent.com' })
  //       .then(auth => {
  //         this.gapiSetup = true;
  //         this.authInstance = auth;
  //       });
  //   });
  // }
  // async authenticate(): Promise<gapi.auth2.GoogleUser> {
  //   // Initialize gapi if not done yet
  //   if (!this.gapiSetup) {
  //     await this.initGoogleAuth();
  //   }

  //   // Resolve or reject signin Promise
  //   return new Promise(async () => {
  //     await this.authInstance.signIn().then(
  //       user => this.user = user,
  //       error => this.error = error);
  //   });
  // }
  // async signout(): Promise<gapi.auth2.GoogleUser>{
  //   return new Promise(async ()=>{
  //     await this.authInstance.signOut();
  //   });
  // }
  // async checkIfUserAuthenticated(): Promise<boolean> {
  //   // Initialize gapi if not done yet
  //   if (!this.gapiSetup) {
  //     await this.initGoogleAuth();
  //   }

  //   return this.authInstance.isSignedIn.get();
  // }
}
