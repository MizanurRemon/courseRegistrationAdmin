import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { take } from 'rxjs';
import { StudentResponse } from '../model/student.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  ngOnInit(): void {
    this.getStudents()
  }

  constructor(private apiService: ApiService) {

  }

  studentResponse?: StudentResponse

  getStudents() {
    this.apiService.getStudents().pipe(take(1)).subscribe({
      next: (response) => {
        this.studentResponse = response;
        console.log(this.studentResponse)
      }
    });
  }

}
