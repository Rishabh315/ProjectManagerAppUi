import { Component, Input, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/project.service';
import { UserService } from 'src/app/user.service';
import { UserDetails } from 'src/app/user/UserDetails';
import { ProjectDetails } from '../ProjectDetails';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})

export class AddProjectComponent implements OnInit {
  project:ProjectDetails = new ProjectDetails();
  manager: UserDetails = new UserDetails();
  @Input() isEndDateValid: boolean = false;

  
  constructor(private projectService : ProjectService,
    private userService: UserService) { }

  ngOnInit(): void {
    document.body.classList.add('add-project-background');
    
    setTimeout( () => {
      this.manager = this.userService.getUserDetails();
    }, 20);
  }

  ngOnDestroy(): void {
    document.body.classList.remove('add-project-background');
    
  }

  validateEndDate(startdate,enddate){
    if(startdate > enddate)
      this.isEndDateValid = false;
    else
      this.isEndDateValid = true;
  }   


  addNewProject(){
    document.getElementById("message_bg").style.display="block";
    let responseDataBack =  this.projectService.addProject(this.manager.userId, this.project);
      responseDataBack.subscribe((response) =>{
        console.log(response);
      }); 
         
    setTimeout(()=>{
      document.getElementById("message_bg").style.display="none";
    },2000);
  }
}
