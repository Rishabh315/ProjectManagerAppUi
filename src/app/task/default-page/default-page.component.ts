import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.css']
})
export class DefaultPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.body.classList.add("dark-background");
  }

  ngOnDestroy(): void {
    document.body.classList.remove("dark-background");
  }

}
