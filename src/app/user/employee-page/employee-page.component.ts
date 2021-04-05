import { EventEmitter, Injectable, Output } from '@angular/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { TaskDetails } from 'src/app/task/TaskDetails';
import { UserService } from 'src/app/user.service';
import { UserDetails } from '../UserDetails';

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class EmployeePageComponent implements OnInit {

  user: UserDetails = new UserDetails();
  taskList: TaskDetails[];
  responseData: any;
  leftNav: any;
  taskCount: number = 1;
  currentTask: TaskDetails = new TaskDetails;

  constructor(private userService: UserService,
    private taskService: TaskService,
    private router: Router) { }

  ngOnInit(): void {
    this.leftNav = document.getElementById("left-navbar");
    this.router.navigate(['userhome/empPage/welcome']);
    setTimeout(()=>{
     this.user = this.userService.getUserDetails();
     this.getAllUserTasks(this.user.userId);
    },20);
  }

  getAllUserTasks(userId: number){
    this.responseData = this.taskService.getTaskByUserId(userId);
    this.responseData.subscribe( (response) => {
      this.taskList = response;
      this.taskService.setTaskList(this.taskList);
      this.createTaskDiv();
    });
   
  }

  createTaskDiv(){
    this.taskList.forEach( (task) => {
      this.leftNav.innerHTML += "<div class='task-container " + 
      task.taskPriority.toLowerCase() + "' id='"+ this.taskCount + "'>" + 
      "<b>Task " + this.taskCount + "</b>: " + task.taskName + "</div>";
      this.taskCount++;
    });
    this.addClickEvent();
  }

  addClickEvent(){
    var divs = document.querySelectorAll(".task-container");
    divs.forEach( (div) => {
      div.addEventListener("click", (event) => {
        const target = event.target as Element;
        this.saveTaskById(target.id);
      });
    });
  }

  saveTaskById(taskId: string){
    this.currentTask = this.taskList[Number(taskId) - 1];
    this.taskService.setTaskDetails(this.currentTask);
    this.leftNav.style.display = "none";
    this.goToViewTaskComponent();
  }

  goToViewTaskComponent(){
    this.router.navigate(['userhome/empPage/viewTask'], { state: {task: this.currentTask}});
  }

  displayNavBar(){
    if(this.leftNav.style.display == "none")
      this.leftNav.style.display = "block";
    else
    this.leftNav.style.display = "none";
  }
  
}
