import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { Router } from '@angular/router';
import { LogserveService } from '../logserve.service';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;
  constructor(private authService: SocialAuthService, private router: Router, private ls: LogserveService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.ls.userinfo=this.user;
      this.loggedIn = (user != null);
    });
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      ()=>{
        console.log("user signed in sucessfully");
        this.ls.isloggedIn=this.loggedIn;
        this.router.navigate(['/login/notecard']);
      }
    );
  }
  signOut(): void {
    this.authService.signOut().then(()=>{
      this.user=null;
      this.ls.userinfo=null;
      this.loggedIn = false;
      this.ls.isloggedIn=this.loggedIn;
      console.log("user logged out successfully");
      this.router.navigate(['/login/home']);
    });
  }
}
