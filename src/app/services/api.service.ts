import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../model/login.model';
import { HttpClient } from '@angular/common/http';
import { RegisteredCourses } from '../model/registeredCourses.model';
import { CommonResponse } from '../model/common.model';
import { CousesResponse } from '../model/courses.model';
import { StudentResponse } from '../model/student.model';
import { SemesterResponse } from '../model/semester.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = "http://localhost:5001/v2/"
  private LOGIN = "admin_login"
  private REGISTERED_COURSES = "get_registered_courses"
  private UPDATE_REGISTERED_COURSE_STATUS = "update_registered_course_status";
  private COURSES = "courses";
  private ADD_COURSES = "add_course";
  private GET_STUDENT = "get_student";
  private ADD_STUDENT = "add_student";
  private GET_SEMESTER = "get_semester";
  private ADD_SEMESTER = "add_semester"
  private UPDATE_STUDENT_STATUS = "update_student_status"
  private UPDATE_COURSE_STATUS = "update_course_status"
  private UPDATE_COURSE = "update_course"
  private UPDATE_SEMESTER_STATUS = "update_semester_status"
  private UPDATE_SEMESTER = "update_semester"
  private STUDENT_IMAGE_UPDATE = "update_student_image"
  private UPDATE_STUDENT_DETAILS = "update_student_details"

  constructor(private http: HttpClient) { }

  adminLogin(username: String, password: String): Observable<LoginResponse> {

    const formData: any = new FormData();
    formData.append('username', username)
    formData.append('password', password)


    return this.http.post<LoginResponse>(this.BASE_URL + this.LOGIN, formData);

  }

  getRegisteredCourse(): Observable<RegisteredCourses> {

    return this.http.get<RegisteredCourses>(this.BASE_URL + this.REGISTERED_COURSES);
  }

  updateRegisteredCourseStatus(id: any, status: any): Observable<CommonResponse> {
    const formData: any = new FormData();
    formData.append('id', id)
    formData.append('status', status)

    return this.http.post<CommonResponse>(this.BASE_URL + this.UPDATE_REGISTERED_COURSE_STATUS, formData);
  }

  getCourses(): Observable<CousesResponse> {

    return this.http.get<CousesResponse>(this.BASE_URL + this.COURSES);
  }

  addCourses(courseName: any, credits: String): Observable<CommonResponse> {
    const formData: any = new FormData();
    formData.append('title', courseName)
    formData.append('credits', credits)
    formData.append('status', 'active')

    return this.http.post<CommonResponse>(this.BASE_URL + this.ADD_COURSES, formData);
  }

  getStudents(): Observable<StudentResponse> {
    return this.http.post<StudentResponse>(this.BASE_URL + this.GET_STUDENT, "");
  }

  getSemester(): Observable<SemesterResponse> {
    return this.http.get<SemesterResponse>(this.BASE_URL + this.GET_SEMESTER);
  }

  addSemester(title: any) {

    var formData: any = new FormData()
    formData.append("title", title)
    formData.append('status', 'active')

    return this.http.post<CommonResponse>(this.BASE_URL + this.ADD_SEMESTER, formData)
  }

  addStudent(name: any, phone: any, rollNo: any, image: any): Observable<CommonResponse> {

    var formData: any = new FormData()
    formData.append("name", name)
    formData.append('phone', phone)
    formData.append("roll_no", rollNo)
    formData.append('file', image)

    return this.http.post<CommonResponse>(this.BASE_URL + this.ADD_STUDENT, formData)
  }


  updateStudentStatus(id: any, status: any): Observable<CommonResponse> {
    var formData: any = new FormData()
    formData.append("id", id)
    formData.append('status', status)

    return this.http.post<CommonResponse>(this.BASE_URL + this.UPDATE_STUDENT_STATUS, formData);
  }

  updateCourseStatus(id: any, status: any): Observable<CommonResponse> {
    var formData: any = new FormData()
    formData.append("id", id)
    formData.append('status', status)

    return this.http.post<CommonResponse>(this.BASE_URL + this.UPDATE_COURSE_STATUS, formData);
  }

  updateCourse(id: any, title: any, credits: any): Observable<CommonResponse> {
    var formData: any = new FormData()
    formData.append("id", id)
    formData.append('title', title)
    formData.append('credits', credits)

    return this.http.post<CommonResponse>(this.BASE_URL + this.UPDATE_COURSE, formData);
  }

  updateSemesterStatus(id: any, status: any): Observable<CommonResponse> {

    var formData = new FormData()
    formData.append("id", id)
    formData.append("status", status)
    return this.http.post<CommonResponse>(this.BASE_URL + this.UPDATE_SEMESTER_STATUS, formData)
  }

  updateSemester(id: any, title: any): Observable<CommonResponse> {
    var formData = new FormData()
    formData.append("id", id)
    formData.append("title", title)

    return this.http.post<CommonResponse>(this.BASE_URL + this.UPDATE_SEMESTER, formData)
  }

  updateStudentImage(id: any, image: any): Observable<CommonResponse> {
    var formData = new FormData()
    formData.append("id", id)
    formData.append("file", image)
    return this.http.post<CommonResponse>(this.BASE_URL + this.STUDENT_IMAGE_UPDATE, formData)
  }

  saveUpdatedStudentDetails(id: any, name: any): Observable<CommonResponse> {
    var formData = new FormData()
    formData.append("id", id)
    formData.append("name", name)

    return this.http.post<CommonResponse>(this.BASE_URL + this.UPDATE_STUDENT_DETAILS, formData);
  }


}
