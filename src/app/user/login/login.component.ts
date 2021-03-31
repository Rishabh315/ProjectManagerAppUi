import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { UserDetails } from '../UserDetails';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  condition : any;
  user : UserDetails = new UserDetails();

  constructor(public userService: UserService,
    private router: Router) { 

  }

  ngOnInit(): void {
    
  }
  
  login(){
    let responseDataBack =  this.userService.login(this.user);
      responseDataBack.subscribe((responseData) =>{
        this.condition = responseData;
        if(this.condition == 1){
          this.findByEmail();
          this.router.navigate(['/userhome']);
        }
      });
  }

  findByEmail(){
    let responseDataBack = this.userService.findByEmail(this.user.userEmailId);
    responseDataBack.subscribe((responseData) =>{
      this.user = responseData;
      this.saveUserDetails(this.user);
    });   
  }

  saveUserDetails(user: UserDetails){
    this.userService.setUserDetails(user[0]);
  }
}
