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

  getClasses() {
    return this.apiRequestService.get('api/User/current/schools/classes');
  }

  AddClass(classData: any) {
    return this.apiRequestService.post('api/User/current/schools/classes', classData);
  }

  addClass(newClass: any) {
    return this.apiRequestService.post('api/User/addClass', newClass);
  }

  updateClass(classData: any) {
    return this.apiRequestService.put('api/User/updateClass', classData);
  }

  deleteClass(classId: string) {
    return this.apiRequestService.delete(`api/User/deleteClass/${classId}`);
  }

  getAll() {
    return this.apiRequestService.get('api/User/getAll');
  }

  updateStudent(user: any) {
    return this.apiRequestService.put('api/User/updateStudent', user);
  }

}
