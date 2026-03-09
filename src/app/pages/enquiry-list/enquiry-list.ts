import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Master } from '../../services/masterOLD';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-enquiry-list',
  imports: [FormsModule,DatePipe],
  templateUrl: './enquiry-list.html',
  styleUrl: './enquiry-list.css'
})
export class EnquiryList implements OnInit {

  constructor(private masterSrv: Master) {
  }

  enquiryList: any[] = [];
  typeList: any[] = [];
  statusList: any[] = [];
  
  
  newEnquiryObject: any = {
   enquiryId: 0,
   enquiryTypeId: 0,
   enquiryStatusId: 0,
   customerName: '',
   mobileNo: '',
   email: '',
   message: '',
   createdDate: this.formatDate(new Date()), // ad esempio, oggi
   resolution: ''
 };
  @ViewChild('empModal') empModal: ElementRef | undefined;

formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}
ngOnInit(): void {
    this.GetAllEnquiries();
    this.GetAllTypes();
    this.GetAllStatus();
  }

GetAllEnquiries() {
  this.masterSrv.getEnquiryAll().subscribe((data: any) => {
   
    this.enquiryList = data;
   
    })

}
GetAllStatus() {
  this.masterSrv.getEnquiryStatuses().subscribe((data: any) => {

    this.statusList = data;

    })

}
GetAllTypes() {
  this.masterSrv.getEnquiryTypes().subscribe((data: any) => {
   
    this.typeList = data;
   
    })

}
onEdit(enquiry: any) {
  this.newEnquiryObject = enquiry;
  this.OpenModal();
}


OpenModal() {
   // Logic to open the modal for adding a new employee
   if (this.empModal) { 
       this.empModal.nativeElement.style.display = 'block';
   }
 }

  CloseModal() {
   // Logic to open the modal for adding a new employee
   if (this.empModal) { 
       this.empModal.nativeElement.style.display = 'none';
   }
 }
 onReset() { 
    this.newEnquiryObject = {
      enquiryId: 0,
      enquiryTypeId: 0,
      enquiryStatusId: 0,
      customerName: '',
      mobileNo: '',
      email: '',
      message: '',
      createdDate: this.formatDate(new Date()), // ad esempio, oggi
      resolution: ''
    };
  }
  onUpdate() {
    this.CloseModal();
    this.masterSrv.uodateEnquiry(this.newEnquiryObject).subscribe((res: any) => {
      console.log(res);
      this.GetAllEnquiries();
      this.CloseModal();
    })
}
 onDelete(id: number) {
    const isDelete = confirm('Are you sure you want to delete this record?');
    if (!isDelete) {
      return;
    }
    this.masterSrv.deleteEnquiry(id).subscribe((res: any) => {
      console.log(res);
      this.GetAllEnquiries();
    })
  }

getType(id: number): string {
  return this.typeList.find(type => type.typeId === id)?.typeName || 'Unknown';
} 
getStatus(id: number): string {
  return this.statusList.find(status => status.statusId === id)?.status || 'Unknown';
}
}