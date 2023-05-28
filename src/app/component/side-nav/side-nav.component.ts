import { Component, Input, OnInit } from '@angular/core';
import { faHome, faUser, faBook } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit{

  @Input() sideNavStatus:boolean = false;
  navList = [
    {
      number : 1,
      icon : faHome,
      title: 'home'
    },

    {
      number : 2,
      icon : faUser,
      title: 'Student'
    },

    {
      number : 3,
      icon : faBook,
      title: 'Course'
    },

  ]

  ngOnInit(): void {
  }

  constructor(){

  }

  homeIcon = faHome
  userIcon = faUser
}
