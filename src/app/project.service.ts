import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectDetails } from './project/ProjectDetails';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url = "http://localhost:8086/api/project/";
  currentProjectId: number;
  constructor(private httpClient: HttpClient) { }

  addProject(managerId: number, project: ProjectDetails){
    return this.httpClient.post<ProjectDetails>(this.url + "addProject/" + managerId, project);
  }

  getProjectByManagerId(managerId: number){
    return this.httpClient.get(this.url + "viewProjectByManagerId/" + managerId);
  }

  editProjectByProjectId(project: ProjectDetails){
    return this.httpClient.put<ProjectDetails>(this.url + "editProjectById/" + this.currentProjectId, project);
  }

  viewProjectByProjectId() {
    return this.httpClient.get<ProjectDetails>(this.url + "viewProjectById/" + this.currentProjectId);
  }

  deleteProjectById(projectId: number){
    return this.httpClient.delete(this.url + "deleteProjectById/" + projectId);
  }

  setCurrentProjectId(projectId: number){
    this.currentProjectId = projectId;
  }

  getCurrentProjectId(){
    return this.currentProjectId;
  }
}
