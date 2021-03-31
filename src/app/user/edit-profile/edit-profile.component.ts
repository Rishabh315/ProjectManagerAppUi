import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { UserDetails } from '../UserDetails';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

user: UserDetails = new UserDetails();
editUserForm: any;
inputGroup: any;
responseData: any;
 
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user =  this.userService.getUserDetails();
   
    this.editUserForm = document.getElementById("edit-user-form");
    this.inputGroup = this.editUserForm.querySelectorAll("input");
    this.inputGroup.forEach(input => {
      input.disabled = true;
    });
  }
  
  enableAllInputs(){
    this.inputGroup.forEach(input => {
      input.disabled = false;
    });
  }

  editUserDetails(){
   this.responseData = this.userService.editUserDetails(this.user);
   this.responseData.subscribe((response) => {
     console.log(response);
   })
  }
}
