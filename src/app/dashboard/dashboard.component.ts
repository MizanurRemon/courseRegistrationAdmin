import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { take } from 'rxjs';
import { RegisteredCourses } from '../model/registeredCourses.model';
import { Daum } from '../model/registeredCourses.model';
import { CommonResponse } from '../model/common.model';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faCancel } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  checkIcon = faCheck
  cancelIcon = faCancel

  approved: any = "approved"
  decline: any = "decline"

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.getRegisteredCourse()
  }

  registeredCourses?: RegisteredCourses

  commonResponse?: CommonResponse


  getRegisteredCourse() {
    console.log("course")
    this.apiService.getRegisteredCourse().pipe(take(1)).subscribe({
      next: (response) => {
        this.registeredCourses = response

      }
    });
  }

  statusChangeClick(id: any, status: any) {

    //console.log(id + " " + status)
    this.apiService.updateRegisteredCourseStatus(id, status).pipe(take(1)).subscribe({
      next: (response) => {

        this.commonResponse = response

        alert(this.commonResponse?.message)
        if (this.commonResponse?.message == "successfully updated") {
          this.getRegisteredCourse()
        } 

      }
    });

  }

}
