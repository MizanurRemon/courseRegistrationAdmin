import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../services/sidenav.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sideNavItem: any
  ngOnInit(): void {

  }

  constructor(public sideNavService: SidenavService) {
   // this.sideNavItem = this.sideNavService.sideNavItem
  }

  sideNavStatus: boolean = false
}
