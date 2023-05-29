import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faHome, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() sideNavToggled = new EventEmitter<boolean>()
  menuStatus: boolean = false

  constructor(private router: Router, private cookieService: CookieService) {

  }

  ngOnInit(): void {

  }

  homeIcon = faHome
  personIcon = faUser
  menuIcon = faBars

  sideNavToggle(){
    this.menuStatus = !this.menuStatus
    this.sideNavToggled.emit(this.menuStatus)
  }

  logOut(){
    this.cookieService.delete('id')
    this.cookieService.delete('token')
    

    this.router.navigate([''], { replaceUrl: true})
  }


  reloadHome(){
    console.log("reload")
    this.router.navigate(['/home'], { replaceUrl: true})
  }
}
