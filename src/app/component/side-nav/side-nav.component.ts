import { Component, Input, OnInit } from '@angular/core';
import { faHome, faUser, faBook } from '@fortawesome/free-solid-svg-icons';
import { SidenavService } from 'src/app/services/sidenav.service';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @Input() sideNavStatus: boolean = false;

  navList = [
    {
      number: 1,
      icon: faHome,
      title: 'home'
    },

    {
      number: 2,
      icon: faUser,
      title: 'student'
    },

    {
      number: 3,
      icon: faBook,
      title: 'course'
    },

  ]

  ngOnInit(): void {
   
  }

  constructor(private sideNavService: SidenavService) {

  }

  onItemClick(item: any) {
    //console.log(item)
    this.sideNavService.sideNavItem = item
  }

}
