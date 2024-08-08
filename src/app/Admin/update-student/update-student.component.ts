import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../Service/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-student.component.html',
  styleUrl: './update-student.component.scss'
})
export class UpdateStudentComponent  {
  @Input() student: any;
  @Input() classes: any[] = [];
  @Output() closeModal = new EventEmitter<void>();
  @Output() updateSuccess = new EventEmitter<void>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  submitEditForm() {
    const updatedStudent = {
      id: this.student.id,
      firstName: this.student.firstName,
      lastName: this.student.lastName,
      phoneNumber: this.student.phoneNumber,
      classId: this.student.classId,
    };

    this.userService.updateStudent(updatedStudent).subscribe({
      next: (response) => {
        console.log('Mise à jour réussie', response);
        this.updateSuccess.emit();
        this.closeModal.emit();
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour', error);
      },
    });
  }
}
