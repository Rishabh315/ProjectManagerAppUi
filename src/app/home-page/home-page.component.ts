import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  onClickScroll(elementId: string){
    this.viewportScroller.scrollToAnchor(elementId);
    document.getElementById("top-nav").className = "navBar";
  }

  iconPressEvent() {
    let icon = document.getElementById("icon");
    var x = document.getElementById("top-nav");
    if (x.className === "navBar") {
      x.className += " responsive";
      icon.style.transform = "rotate(0deg)";
    } else {
      x.className = "navBar";
      icon.style.transform = "rotate(90deg)";
    }
  }
}
