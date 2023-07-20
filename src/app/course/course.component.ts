import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { take } from 'rxjs';
import { CousesResponse } from '../model/courses.model';
import { CommonResponse } from '../model/common.model';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  type: any = "";

  editIcon = faEdit

  courseID : any
  courseName : any
  courseCredit: any

  ngOnInit(): void {

    this.getCourses()
  }

  constructor(private apiService: ApiService) {

  }

  courseResponse?: CousesResponse
  commonResponse?: CommonResponse

  getCourses() {
    this.apiService.getCourses().pipe(take(1)).subscribe({
      next: (response) => {
        this.courseResponse = response
      }
    });
  }

  changeValue(m: any) {

    if (this.type == 'add') {
      this.type = ''
    } else {
      this.type = m
    }

  }

  onItemClick(courseID : any, name: any, credit: any) {

    this.courseID = courseID
    this.courseName = name
    this.courseCredit = credit
    this.type = "update"
  }

  updateCourse(id: any, name: any, status: any){

    //alert(id+" "+name+" "+status)

    this.apiService.updateCourse(id,name,status).pipe(take(1)).subscribe({
      next: (response) => {
        this.commonResponse = response

        if (this.commonResponse.message == "successfully updated") {
          this.type = ""
          this.getCourses()
        } else {
          alert(this.commonResponse.message)
        }
      }
    });

  }


  addCourse(coursename: any, credits: any) {

    if (coursename === "" || credits === "") {
      alert("empty field")
    } else {
      this.apiService.addCourses(coursename, credits).pipe(take(1)).subscribe({
        next: (response) => {
          this.commonResponse = response

          if (this.commonResponse.message == "successfully inserted") {
            this.getCourses()
          } else {
            alert(this.commonResponse.message)
          }
        }
      });
    }
  }

  updateCourseStatus(id: any, status : any){


    var changedStatus = status ? "inactive" : "active"

    this.type = ""

    this.apiService.updateCourseStatus(id, changedStatus).pipe(take(1)).subscribe({
      next: (response) => {
        this.commonResponse = response

        if (this.commonResponse.message == "successfully updated") {
          this.getCourses()
        } else {
          alert(this.commonResponse.message)
        }
      }
    });
  }
}
