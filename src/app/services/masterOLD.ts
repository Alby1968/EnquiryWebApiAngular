import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Master {
  
  constructor(private http: HttpClient) {
    
    
  }

  createEnquiry(enquiry: any) {
    return this.http.post('https://localhost:7158/api/enquirymaster/CreateNewEnquiry', enquiry);
  }

  uodateEnquiry(enquiry: any) {
    return this.http.put('https://localhost:7158/api/enquirymaster/UpdateEnquiry', enquiry);
  }

  deleteEnquiry(id: number) {
    // return this.http.delete(`https://localhost:7158/api/enquirymaster/DeleteEnquiryById${id}`);
    return this.http.delete('https://localhost:7158/api/enquirymaster/DeleteEnquiryById?id=' + id);
  }


  getEnquiryTypes() {
    return this.http.get('https://localhost:7158/api/enquirymaster/GetAllTypes');
   }

  getEnquiryStatuses() {
    return this.http.get('https://localhost:7158/api/enquirymaster/GetAllStatus');
  }     

  getEnquiryAll() {
    return this.http.get('https://localhost:7158/api/enquirymaster/GetAllEnquiry');
  } 

  getTypeById(id: number) {
    return this.http.get('https://localhost:7158/api/enquirymaster/GetAllTypeById?id=' + id);
  }

  getStatusById(id: number) {
    return this.http.get('https://localhost:7158/api/enquirymaster/GetAllStatusById?id=' + id);
}
}
