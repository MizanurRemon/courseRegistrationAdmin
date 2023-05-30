import { Component, OnInit } from '@angular/core';
import { SemesterResponse } from '../model/semester.model';
import { ApiService } from '../services/api.service';
import { take } from 'rxjs';
import { CommonResponse } from '../model/common.model';

@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.css']
})
export class SemesterComponent implements OnInit {

  type: any = "";

  ngOnInit(): void {
    this.getSemester()
  }

  constructor(private apiService: ApiService) {

  }

  semesterResponse?: SemesterResponse
  commonResponse?: CommonResponse

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

  getSemester() {
    this.apiService.getSemester().pipe(take(1)).subscribe({
      next: (response) => {
        this.semesterResponse = response;
      }
    });
  }

  addSemester(title: any) {
    if (title === "") {
      alert("empty value")
    } else {
      //alert(title)
      this.apiService.addSemester(title).pipe(take(1)).subscribe({
        next: (response) => {
          this.commonResponse = response
          alert(this.commonResponse.message)
          if (this.commonResponse.message == "successfully inserted") {
            this.getSemester()
          }
        }
      })
    }
  }

}
