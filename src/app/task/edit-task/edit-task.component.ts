import { Component, Input, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/project.service';
import { ProjectDetails } from 'src/app/project/ProjectDetails';
import { TaskService } from 'src/app/task.service';
import { UserService } from 'src/app/user.service';
import { UserDetails } from 'src/app/user/UserDetails';
import { TaskDetails } from '../TaskDetails';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  manager: UserDetails = new UserDetails;
  projectList: ProjectDetails[];
  responseData: any;
  selectProject: any;
  selectedProject: ProjectDetails = new ProjectDetails();
  taskList: TaskDetails[];
  selectTask: any;
  selectedTask: TaskDetails = new TaskDetails();
  @Input() displayWarning: boolean = false;

  constructor(private userService: UserService,
    private projectService: ProjectService,
    private taskService: TaskService) { }

  ngOnInit(): void {
    this.selectProject = document.getElementById("select-project");

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

  addProjectListToSelect(){
    this.projectList.forEach( (project) => {
      this.selectProject.innerHTML += "<option>" 
      +  project.projectName + "</option>";
    });
  }

  setSelectedProject(){
    this.selectedProject = this.projectList[this.selectProject.selectedIndex];
    // console.log(this.selectedProject);
    this.getTaskList();
  }

  getTaskList(){
    this.responseData = this.taskService.getTaskByProjectId(this.selectedProject.projectId);
    this.responseData.subscribe( (response) => {
      this.taskList = response;
      this.addTaskListToSelect();                 
    });
  }

  addTaskListToSelect(){
    this.selectTask = document.getElementById("select-task");

    this.selectTask.innerHTML = "";
    this.taskList.forEach( (task) => {
      this.selectTask.innerHTML += "<option>" 
      + task.taskName + "</option>";
    });
  }

  setSelectedTask(){
    this.selectedTask = this.taskList[this.selectTask.selectedIndex];
    console.log(this.selectedTask);
    // this.getTaskList();
  }

  displayDeleteMessage(){
    document.getElementById("task_delete").style.display="block";
  }

  deleteTask(){
    this.responseData = this.taskService.deleteTaskById(this.selectedTask.taskId);
    this.responseData.subscribe( (response) => {
      this.displayWarning = true;
      document.getElementById("warning-task").innerText = "Task Deleted Successfully";
    });
      setTimeout( () => {
        this.hidePopUp();
      }, 2000);
  }

  hidePopUp(){
    document.getElementById("task_delete").style.display="none";
  }

  editTask(){
    // console.log(this.selectedTask);
    this.responseData = this.taskService.editTaskById(this.selectedTask.taskId, this.selectedTask);
    this.responseData.subscribe( (response) => {
      document.getElementById("message_success").style.display="block";
    });

    setTimeout( () => {
      document.getElementById("message_success").style.display="none";
    }, 2000);
  }

  displayEditTaskForm(){
    document.getElementById("edit-task-form").style.display = "block";
  }
}
