import { Component, Input, OnInit } from '@angular/core';
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
@Input() isChangeBtnClicked: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    document.body.classList.add('bg-img');
   
    this.user =  this.userService.getUserDetails();
   
    this.editUserForm = document.getElementById("edit-user-form");
    this.inputGroup = this.editUserForm.querySelectorAll("input");
    this.inputGroup.forEach(input => {
      input.disabled = true;
    });
  }
  
  ngOnDestroy(){
    document.body.classList.remove('bg-img');
  }
  
  enableAllInputs(){
    this.isChangeBtnClicked = true;
    this.inputGroup.forEach(input => {
      input.disabled = false;
    });
  }

  editUserDetails(){
    document.getElementById("message_bg").style.display = "block";
    this.responseData = this.userService.editUserDetails(this.user);
    this.responseData.subscribe((response) => {
     console.log(response);
   });
   setTimeout(()=>{
    document.getElementById("message_bg").style.display = "none";
  },2000);
  }
}
