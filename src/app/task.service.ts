import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskDetails } from './task/TaskDetails';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  task: TaskDetails = new TaskDetails();
  taskList: TaskDetails[];

  url = "http://localhost:8085/api/task/";

  constructor(private httpClient: HttpClient) { }

  getTaskByTaskId(taskId: number){
    return this.httpClient.get<TaskDetails>(this.url + "viewTaskById/" + taskId);
  }

  getTaskByUserId(userId: number){
    return this.httpClient.get<TaskDetails>(this.url + "getTaskByUserId/" + userId);
  }

  updatePercentage(taskId: number, taskPercentage: number){
    return this.httpClient.get<TaskDetails>(this.url + "editTaskPercentage/" + taskId + "/" + taskPercentage);
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
