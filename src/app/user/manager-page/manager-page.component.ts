import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/project.service';
import { ProjectDetails } from 'src/app/project/ProjectDetails';
import { UserService } from 'src/app/user.service';
import { UserDetails } from '../UserDetails';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ManagerPageComponent implements OnInit {

  manager: UserDetails = new UserDetails;
  projectList: ProjectDetails[];
  responseData: any;
  projectContainer: Element;
  editBtnGroup: any;
  deleteBtnCount: number;
  leftNavBar: any;
 

  @Input() deleteProject: ProjectDetails = new ProjectDetails();

  constructor(private userService: UserService,
    private projectService: ProjectService,
    private router: Router) { }

  ngOnInit(): void {
    this.projectContainer = document.getElementById("project-container");
    this.leftNavBar = document.getElementById("left-NavBar");
    this.router.navigate(['userhome/managerPage/welcomeManager']);
    setTimeout( ()=> {
      this.manager = this.userService.getUserDetails();
      this.getMyProjects();
    }, 20);
  }

  toggleNavbar(){
    if(this.leftNavBar.classList == "manager-leftNav"){
      this.leftNavBar.classList.add("responsive-navbar");
    }else{
      this.leftNavBar.classList.remove("responsive-navbar");
    }
  }

  getMyProjects(){
    this.deleteBtnCount = 0;
    this.responseData = this.projectService.getProjectByManagerId(this.manager.userId);
    this.responseData.subscribe( (response) => {
      this.projectList = response;
      this.projectContainer.innerHTML = "";
      this.displayProjects();
    });
  }

  displayProjects(){
    this.projectList.forEach( (project) => {
     
      this.projectContainer.innerHTML += "<div class='project'>"
      + project.projectName + "<button class='edit-btn' id='edit-project-" 
      + project.projectId +"'>Edit</button>\
      <button class='delete-btn' id='delete-project-" + this.deleteBtnCount +
      "'>Del</button></div>";

      this.deleteBtnCount++;    
    });
    setTimeout( ()=> {
      this.getEditBtn();
      this.getDeleteBtn();
    }, 20);
  }

  getEditBtn(){
    var editBtn = this.projectContainer.querySelectorAll('.edit-btn');
    editBtn.forEach( (edit) => {
      edit.addEventListener("click", (event)=>{
        const target = event.currentTarget as Element;
        var projectId = target.id.split("-");
        this.editProject(Number(projectId[projectId.length - 1]));
      });
    });
  }

  editProject(projectId: number){
    this.projectService.setCurrentProjectId(projectId);
    this.router.navigate(['userhome/managerPage/editProject']);
  }

  getDeleteBtn(){
    var deleteBtn = this.projectContainer.querySelectorAll(".delete-btn");
    deleteBtn.forEach( (deletebtn) => {
      deletebtn.addEventListener("click", (event) => {
        const target = event.currentTarget as Element;
        var projectId = target.id.split("-");
        this.deleteProject = this.projectList[Number(projectId[projectId.length -1])];
        this.displayDeleteMessage();
      });
    });
  }

  displayDeleteMessage(){
    document.getElementById("project_delete").style.display="block";
  }

  deleteProjectById(){
    this.responseData = this.projectService.deleteProjectById(this.deleteProject.projectId);
    this.responseData.subscribe( (response) => {
      document.getElementById("warning-project").innerText = "Project Deleted Successfully with its tasks";
      setTimeout( () => {
        this.hidePopUp();
      }, 1500);
    });
  }

  hidePopUp(){
    document.getElementById("project_delete").style.display="none";
  }
}
