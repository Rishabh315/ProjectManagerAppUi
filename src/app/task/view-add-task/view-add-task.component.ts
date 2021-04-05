import { Component, Input, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/project.service';
import { ProjectDetails } from 'src/app/project/ProjectDetails';
import { TaskService } from 'src/app/task.service';
import { UserService } from 'src/app/user.service';
import { UserDetails } from 'src/app/user/UserDetails';
import { AddTaskFormat } from '../AddTaskFormat';
import { AssignTaskFormat } from '../AssignTaskFormat';
import { TaskDetails } from '../TaskDetails';

@Component({
  selector: 'app-view-add-task',
  templateUrl: './view-add-task.component.html',
  styleUrls: ['./view-add-task.component.css']
})
export class ViewAddTaskComponent implements OnInit {

  manager: UserDetails = new UserDetails();
  projectList: ProjectDetails[];
  responseData: any;
  selectProject: any;
  projectNumber: number = 0;
  selectedProject: ProjectDetails = new ProjectDetails();
  @Input() taskList: TaskDetails[];
  @Input() newTask: AddTaskFormat = new AddTaskFormat();
  task: TaskDetails = new TaskDetails();
  @Input() taskOwner: UserDetails = new UserDetails();
  assignTaskFormat: AssignTaskFormat = new AssignTaskFormat();
  newTaskId: number;
  notification: any;
  isEmailIdFound: boolean = true;
  taskTable: any;

  constructor(private projectService: ProjectService,
    private userService: UserService,
    private taskService: TaskService) { }

  ngOnInit(): void {
    this.selectProject = document.getElementById("select-project");
    this.notification = document.getElementById("message_bg");
   
    setTimeout(() => {
      this.manager = this.userService.getUserDetails();
      this.getProjectList();
    }, 20);
  }

  getProjectList(){
    this.responseData = this.projectService.getProjectByManagerId(this.manager.userId);
    this.responseData.subscribe( (response)=> {
      this.projectList = response;
      this.addProjectListToSelect();
    });
  }

  getTaskList(){
    this.responseData = this.taskService.getTaskByProjectId(this.selectedProject.projectId);
    this.responseData.subscribe( (response) => {
      this.taskList = response;
    });
  }

  addProjectListToSelect(){
    this.projectList.forEach( (project) => {
      this.selectProject.innerHTML += "<option>" 
      +  project.projectName + "</option>";
    });
  }

  setSelectedProject(){
    this.selectedProject = this.projectList[this.selectProject.selectedIndex];
    this.getTaskList();
  }

  addNewTask(){
    this.newTask.taskPriority = (<HTMLInputElement>document.getElementById("task-priority")).value;
    this.responseData = this.userService.findByEmail(this.newTask.taskOwnerEmail);
    this.responseData.subscribe( (response) => {
      this.taskOwner = response;
      console.log(this.taskOwner);
      this.isEmailIdFound = !(this.taskOwner[0] == undefined);
    });
    // console.log(this.isEmailIdFound);
    if(!this.isEmailIdFound)
      this.createNewTask();
  }

  createNewTask(){
      this.task.taskName = this.newTask.taskName;
      this.task.taskPriority = this.newTask.taskPriority;
      this.task.taskRequirements = this.newTask.taskRequirement;
  
      this.responseData = this.taskService.createTask(this.selectedProject.projectId, this.task);
      this.responseData.subscribe( (response) => {
        this.newTaskId = response;
        setTimeout( () => {
          this.assignTheTask();
        }, 20);
      }); 
  }

  assignTheTask(){
    this.assignTaskFormat.taskId = this.newTaskId;
    this.assignTaskFormat.userId = this.taskOwner[0].userId;

    // console.log(this.newTaskId);
    // console.log(this.taskOwner[0]);
    this.responseData = this.taskService.assignTask(this.assignTaskFormat);
    this.responseData.subscribe( (response) => {
      console.log(response);
      this.notification.style.display = "block";
      setTimeout(()=>{
      this.notification.style.display = "none";
      },4000);
    });
  }
}
