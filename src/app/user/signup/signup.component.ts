import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { UserDetails } from '../UserDetails';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isEmailUsed : any;
  user : UserDetails = new UserDetails();
  notification: any;

  constructor(public userService: UserService,
    private router: Router) { 

  }

  ngOnInit(): void {
    this.notification = document.getElementById("message_bg");
  }

  signup(){
    let responseDataBack =  this.userService.signup(this.user);
      responseDataBack.subscribe((responseData) =>{
        this.isEmailUsed = responseData;
        if(!this.isEmailUsed){
          this.notification.style.display = "block";
        }
      });

      setTimeout(()=>{
        this.notification.style.display = "none";
        this.router.navigate(['/home/login']);
      },2000);
  }
}

