import { Component, OnInit } from '@angular/core';
import { SemesterResponse } from '../model/semester.model';
import { ApiService } from '../services/api.service';
import { take } from 'rxjs';
import { CommonResponse } from '../model/common.model';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.css']
})
export class SemesterComponent implements OnInit {

  type: any = "";
  editIcon = faEdit

  semTitle: any
  semID: any


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

  updateSemesterStatus(id: any, status: any) {

    this.apiService.updateSemesterStatus(id, status).pipe(take(1)).subscribe({
      next: (response) => {
        this.commonResponse = response
        alert(this.commonResponse.message)
        if (this.commonResponse.message == "successfully updated") {
          this.getSemester()
        }
      }
    })
  }

  onEditClick(id: any, semTitle: any){
    this.type = "update"
    this.semTitle = semTitle
    this.semID = id
  }

  onSemesterUpdateClick(id: any, title: any) {
   

    this.apiService.updateSemester(id, title).pipe(take(1)).subscribe({
      next : (response) =>{
        
        this.commonResponse = response
        alert(this.commonResponse.message)

        if(this.commonResponse.message == "successfully updated"){
          this.type =""
          this.semID = ""
          this.getSemester()
        }

      }
    })
  }

}
