import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faHome, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() sideNavToggled = new EventEmitter<boolean>()
  menuStatus: boolean = false

  constructor() {

  }

  ngOnInit(): void {

  }

  homeIcon = faHome
  personIcon = faUser
  menuIcon = faBars

  sideNavToggle(){
    this.menuStatus = !this.menuStatus
    this.sideNavToggled.emit(this.menuStatus)

    console.log(this.menuStatus)
  }
}
