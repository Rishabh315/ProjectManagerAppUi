import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssignTaskFormat } from './task/AssignTaskFormat';
import { TaskDetails } from './task/TaskDetails';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  task: TaskDetails = new TaskDetails();
  taskList: TaskDetails[];

  url = "http://localhost:8085/api/task/";

  constructor(private httpClient: HttpClient) { }

  createTask(projectId: number, task: TaskDetails){
    return this.httpClient.post(this.url + "create/" + projectId, task);
  }

  assignTask(assignTaskFormat: AssignTaskFormat){
    return this.httpClient.post<AssignTaskFormat>(this.url + "assignTask", assignTaskFormat);
  }

  getTaskByTaskId(taskId: number){
    return this.httpClient.get<TaskDetails>(this.url + "viewTaskById/" + taskId);
  }

  getTaskByUserId(userId: number){
    return this.httpClient.get<TaskDetails>(this.url + "getTaskByUserId/" + userId);
  }

  getTaskByProjectId(projectId: number){
    return this.httpClient.get<TaskDetails>(this.url + "getTaskByProjectId/" + projectId);
  }

  updatePercentage(taskId: number, taskPercentage: number){
    return this.httpClient.get<TaskDetails>(this.url + "editTaskPercentage/" + taskId + "/" + taskPercentage);
  }

  editTaskById(taskId: number, task:TaskDetails){
    return this.httpClient.put<TaskDetails>(this.url + "editTaskById/" + taskId, task);
  }

  deleteTaskById(taskId: number){
    return this.httpClient.delete(this.url + "deleteTaskById/" + taskId);
  }

  setTaskDetails(task: TaskDetails){
    this.task = task;
  }

  getTaskDetails(){
    return this.task;
  }

  setTaskList(taskList: TaskDetails[]){
    this.taskList = taskList;
  }

  getTaskList(){
    return this.taskList;
  }
}
