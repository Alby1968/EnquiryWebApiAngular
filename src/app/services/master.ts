import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

; 





@Injectable({
  providedIn: 'root'
})
export class Master {

  private baseUrl = 'https://enquirywebapi.onrender.com/api/enquirymaster';
  // private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createEnquiry(enquiry: any) {
    return this.http.post(`${this.baseUrl}/CreateNewEnquiry`, enquiry);
  }

  updateEnquiry(enquiry: any) {
    return this.http.put(`${this.baseUrl}/UpdateEnquiry`, enquiry);
  }

  deleteEnquiry(id: number) {
    return this.http.delete(`${this.baseUrl}/DeleteEnquiryById?id=${id}`);
  }

  getEnquiryTypes() {
    return this.http.get(`${this.baseUrl}/GetAllTypes`);
  }

  getEnquiryStatuses() {
    return this.http.get(`${this.baseUrl}/GetAllStatus`);
  }     

  getEnquiryAll() {
    return this.http.get(`${this.baseUrl}/GetAllEnquiry`);
  } 

  getTypeById(id: number) {
    return this.http.get(`${this.baseUrl}/GetAllTypeById?id=${id}`);
  }

  getStatusById(id: number) {
    return this.http.get(`${this.baseUrl}/GetAllStatusById?id=${id}`);
  }
}