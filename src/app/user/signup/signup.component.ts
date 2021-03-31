import { Component, OnInit } from '@angular/core';
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

  constructor(public userService: UserService) { 

  }

  ngOnInit(): void {
  }

  signup(){
    let responseDataBack =  this.userService.signup(this.user);
      responseDataBack.subscribe((responseData) =>{
        console.log(responseData);
        this.isEmailUsed = responseData;
        if(!this.isEmailUsed){
          alert("Congrats! You have successfully added your account");
        }
      });
  }
}

