import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  btnPressCount: number = 0;
  dropdown: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.dropdown = document.getElementById('dropdown-data');
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
}
