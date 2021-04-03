import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { UserDetails } from '../UserDetails';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  
  btnPressCount: number = 0;
  dropdown: any;
  user: UserDetails = new UserDetails();
  responseData: any;
  result: any;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.dropdown = document.getElementById('dropdown-data');
    
    setTimeout(()=>{
      this.getUserFromService();
      if(this.user.userDesignation.toLowerCase() == 'manager'){
        this.router.navigate(['userhome/managerPage']);
      }else{
        this.router.navigate(['userhome/empPage']);
      }
    },100);
  }

  getUserFromService(){
    this.user = this.userService.getUserDetails();
  }

  toggleDropdown(){
    this.btnPressCount++;
    if(this.btnPressCount%2 == 0)
      this.dropdown.style.display = "none";
    else
      this.dropdown.style.display = "block";
  }

  emptyUser(){
    this.userService.emptyUser();
  }

  displayDeleteMessage(){
    document.getElementById("message_delete").style.display="block";
  }

  deleteAccount(){
    this.getUserFromService();
    this.responseData = this.userService.deleteAccount(this.user.userId);
      this.responseData.subscribe( (response)=>{
      this.result = response;
    });

   setTimeout(()=>{
      this.router.navigate(['/home']);
    },2000);
  }
    
  hidePopUp(){
    document.getElementById("message_delete").style.display="none";
  }
}
