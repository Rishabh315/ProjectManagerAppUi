import { Component, Input, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/project.service';
import { ProjectDetails } from '../ProjectDetails';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  project: ProjectDetails= new ProjectDetails();
  @Input() isEndDateValid:boolean = true;


  constructor(private projectService: ProjectService) { 

  }

  ngOnInit(): void {

    setTimeout( () => {
      this.getProjectDetailsById();
    }, 20);
  }

  updateProjectDetails(){
    document.getElementById("message_bg").style.display="block";

    let responseDataBack =  this.projectService.editProjectByProjectId(this.project);
      responseDataBack.subscribe((respone) =>{
        console.log(respone);
      });

      setTimeout(()=>{
        document.getElementById("message_bg").style.display="none";
      },2000);

  }

  getProjectDetailsById(){
    let responseDataBack = this.projectService.viewProjectByProjectId();
    responseDataBack.subscribe((response) =>{
      this.project = response;
    });
  }


  validateEndDate(startdate,enddate){
    if(startdate>enddate)
      this.isEndDateValid = false;
    else
      this.isEndDateValid = true;
   } 


}
