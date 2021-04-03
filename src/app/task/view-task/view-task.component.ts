import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { TaskDetails } from '../TaskDetails';

import { ViewChild } from "@angular/core";
import * as moment from "moment";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexXAxis
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  currentTask: TaskDetails = new TaskDetails();
  responseData: any;
  responseDataTwo: any;
  progressBar: any;
  progressBarContent: any;
  startDate: Date;
  endDate: Date;

  constructor(private taskService: TaskService) { 
    
  }

  ngOnInit(): void {
    this.progressBar = document.getElementById("bar1");
    this.progressBarContent = document.getElementById("bar-content");
    

    setTimeout(()=>{
      this.currentTask = this.taskService.getTaskDetails();
      console.log(this.currentTask);
      setTimeout( () => {
        this.setProgressBarContent(this.currentTask.taskPercentage);
        this.setDate();
      }, 10);
     },100);
  }
  
  setDate(){
    var date = this.currentTask.parentProject.startDate.toString().split("-");
    this.startDate = new Date(Number(date[0]), Number(date[1]), Number(date[2]));

    var date = this.currentTask.parentProject.endDate.toString().split("-");
    this.endDate = new Date(Number(date[0]), Number(date[1]), Number(date[2]));
    this.drawChart();
  }

  drawChart(){
    this.chartOptions = {
      series: [
        {
          data: [
            {
              x: "Project",
              y: [
                this.startDate.getTime(),
                this.endDate.getTime()
              ]
            },
          ]
        }
      ],
      chart: {
        height: 100,
        type: "rangeBar"
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      xaxis: {
        type: "datetime"
      }
    };
  }

  setProgressBarContent(percentage: number){
    this.progressBar.style.width = percentage + "%";
    this.progressBarContent.innerText = percentage + "% Complete";
  }

  updatePercentage(){
    this.responseData = this.taskService.updatePercentage(this.currentTask.taskId, this.currentTask.taskPercentage);
    this.responseData.subscribe( (response) => {
    });
    
    setTimeout( () => {
      this.getProjectById();
    }, 100);
  }

  getProjectById(){
    this.responseDataTwo = this.taskService.getTaskByTaskId(this.currentTask.taskId);
    this.responseDataTwo.subscribe( (response) => {
      this.currentTask = response;
      this.setProgressBarContent(this.currentTask.taskPercentage);
    });
  }
}
