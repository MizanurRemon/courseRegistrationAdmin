import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { take } from 'rxjs';
import { StudentResponse } from '../model/student.model';
import { HelpersService } from '../services/helpers.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonResponse } from '../model/common.model';
import { NgxImageCompressService } from 'ngx-image-compress';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  profileID: any
  name: any

  closeResult?: string;
  image?: File | null = null;
  imgResultBeforeCompression: string | undefined;
  imgResultAfterCompression: string | undefined;
  addIcon = faAdd

  defaultImage: any

  ngOnInit(): void {
    this.getStudents()
  }

  constructor(private imageCompress: NgxImageCompressService, private apiService: ApiService, private helperService: HelpersService, private modalService: NgbModal) {

  }

  studentResponse?: StudentResponse
  commonResponse?: CommonResponse

  getStudents() {
    this.apiService.getStudents().pipe(take(1)).subscribe({
      next: (response) => {
        this.studentResponse = response;
        console.log(this.studentResponse)
      }
    });
  }

  getImage(image: any): any {
    return this.helperService.byteToImage(image)
  }

  open(content: any) {
    this.defaultImage = ""
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      
    }, (reason) => {
     
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addStudent(name: any, phone: any, rollNo: any) {

    if (this.image?.name == null) {
      alert("please upload image")
    } else {
      this.apiService.addStudent(name, phone, rollNo, this.image).pipe(take(1)).subscribe({
        next: (response) => {
          this.commonResponse = response
          alert(this.commonResponse.message)

          if (this.commonResponse.message == "successfully inserted") {
            this.getStudents()
          }
        }
      });
    }

  }

  onChangeFile(event: any) {

    if (event.target.files.length > 0) {
      this.image = event.target.files[0]

      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.defaultImage = this.getImage(e.target.result.split('base64,')[1]);
      };

    }
  }

  compressFile() {
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      this.imgResultBeforeCompression = image;
      console.log('Size in bytes of the uploaded image was:', this.imageCompress.byteCount(image));

      this.imageCompress
        .compressFile(image, orientation, 50, 50) // 50% ratio, 50% quality
        .then(compressedImage => {
          this.imgResultAfterCompression = compressedImage;
          console.log('Size in bytes after compression is now:', this.imageCompress.byteCount(compressedImage));
        });
    });
  }

  onStatusUpdate(id: any, status: any) {
    var changeStatus = status ? 'inactive' : 'active'

    this.apiService.updateStudentStatus(id, changeStatus).pipe(take(1)).subscribe({
      next: (response) => {
        this.commonResponse = response
        alert(this.commonResponse.message)

        this.getStudents()
        // if (this.commonResponse.message == "successfully updated") {

        // }
      }
    });

  }


  viewProfileImage(content: any, student: any) {
    this.image = null
    this.defaultImage = "data:image/png;base64," + student.image
    this.profileID = student.id
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  updateProfileImage(id: any, image: any) {
    if(image == null){
      alert("choose image from file")
    }else{
      this.apiService.updateStudentImage(id, image).pipe(take(1)).subscribe({
        next : (response) =>{
          this.commonResponse = response
          alert(this.commonResponse.message)


          if(this.commonResponse.message == "successfully updated"){
            this.getStudents()

          }
        }
      })
    }
  }

  updateStudentDetails(student: any, content: any, title: any){
    
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.profileID =student.id
    this.name = student.name

  }

  saveUpdatedStudentDetails(id: any, name: any){
    this.apiService.saveUpdatedStudentDetails(id, name).pipe(take(1)).subscribe({
      next : (response) =>{
        this.commonResponse = response
        alert(this.commonResponse.message)


        if(this.commonResponse.message == "successfully updated"){
          this.getStudents()

        }
      }
    })

    
  }

}

