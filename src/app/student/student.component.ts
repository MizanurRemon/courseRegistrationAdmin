import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { take } from 'rxjs';
import { StudentResponse } from '../model/student.model';
import { HelpersService } from '../services/helpers.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonResponse } from '../model/common.model';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  closeResult?: string;
  image?: File
  imgResultBeforeCompression: string | undefined;
  imgResultAfterCompression: string | undefined;

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

}


//modal.close('Save click')
