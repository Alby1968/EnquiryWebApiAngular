import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Master } from '../../services/masterOLD';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-enquiry',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './new-enquiry.html',
  styleUrl: './new-enquiry.css'
})
export class NewEnquiry {

 newEnquiryObject: any = {
   enquiryId: 0,
   enquiryTypeId: 0,
   enquiryStatusId: 0,
   customerName: '',
   mobileNo: '',
   email: '',
   message: '',
   createdDate: new Date(),
   resolution: ''
 };

 masterSrv = inject(Master);

  typeList: Observable<any> = new Observable<any>();
  statusList: Observable<any> = new Observable<any>();

  constructor() {
    this.typeList = this.masterSrv.getEnquiryTypes();
    this.statusList = this.masterSrv.getEnquiryStatuses();
  }

  onSave() {
    this.masterSrv.createEnquiry(this.newEnquiryObject).subscribe(response => {
      console.log('Enquiry created successfully:', response);
      this.onReset();
      alert('Enquiry created successfully!');
    }, error => {
      console.error('Error creating enquiry:', error);
    });
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
      createdDate: new Date(),
      resolution: ''
    };
  }
}