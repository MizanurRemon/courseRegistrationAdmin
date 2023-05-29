import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { take } from 'rxjs';
import { CousesResponse } from '../model/courses.model';
import { CommonResponse } from '../model/common.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  type: any = "";

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

  onItemClick() {
    this.type = "update"
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
}
