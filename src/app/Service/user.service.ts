import { ApiRequestService } from './../Utils/api-request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiRequestService: ApiRequestService) { }

  getStudents() {
    return this.apiRequestService.get('api/User/current/schools/students');
  }

  getTeachers() {
    return this.apiRequestService.get('api/User/current/schools/teachers');
  }

  getNumberClasses() {
    return this.apiRequestService.get('api/User/current/schools/classes/count');
  }

}
