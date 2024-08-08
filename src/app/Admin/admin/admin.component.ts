import { Component, OnInit, HostListener } from '@angular/core';
import { UserService } from '../../Service/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UpdateStudentComponent } from '../update-student/update-student.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SidebarComponent, CommonModule, UpdateStudentComponent, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  user: any;
  sectionsCollapsed = {
    students: false,
    teachers: false,
  };

  students: any[] = [];
  filteredStudents: any[] = [];
  filteredTeachers: any[] = [];
  isCollapsed: boolean = false;

  filterMenuOpen: boolean = false;
  searchQuery: string = '';
  selectedClasses: string[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  paginatedStudents: any[] = [];
  isModalOpen: boolean = false;
  selectedStudent: any = null;

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.getAll();
  }

  private getAll() {
    this._userService.getAll().subscribe({
      next: (data) => {
        this.user = data;
        this.students = [...this.user.students];
        this.filteredTeachers = [...this.user.teachers];
        this.selectedClasses = this.user.classes.map((c: any) => c.label);
        this.filterStudents();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données', error);
      },
    });
  }

  toggleSection(section: string) {
    this.sectionsCollapsed[section as 'students' | 'teachers'] = !this.sectionsCollapsed[section as 'students' | 'teachers'];
  }

  onSearchInput() {
    this.filterStudents();
  }

  goToClasses() {
    console.log('Navigating to classes');
  }

  goToTeachers() {
    console.log('Navigating to teachers');
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleFilterMenu() {
    this.filterMenuOpen = !this.filterMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative') && this.filterMenuOpen) {
      this.filterMenuOpen = false;
    }
  }

  toggleClassFilter(label: string) {
    const index = this.selectedClasses.indexOf(label);
    if (index === -1) {
      this.selectedClasses.push(label);
    } else {
      this.selectedClasses.splice(index, 1);
    }
    this.filterStudents();
  }

  selectAllClasses() {
    if (this.selectedClasses.length === this.user.classes.length) {
      this.selectedClasses = [];
    } else {
      this.selectedClasses = this.user.classes.map((c: any) => c.label);
    }
    this.filterStudents();
  }

  clearFilters() {
    this.selectedClasses = this.user.classes.map((c: any) => c.label);
    this.filterStudents();
  }

  filterStudents() {
    const query = this.searchQuery.toLowerCase();
    if (query.length >= 3 || query.length === 0) {
      this.filteredStudents = this.students.filter((student: any) =>
        `${student.firstName} ${student.lastName}`.toLowerCase().includes(query) &&
        (this.selectedClasses.length === 0 || this.selectedClasses.includes(student.className))
      );
      this.paginateStudents();
    }
  }

  paginateStudents() {
    const pageSize = 10;
    const startIndex = (this.currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    this.paginatedStudents = this.filteredStudents.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.filteredStudents.length / pageSize);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateStudents();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateStudents();
    }
  }

  openEditModal(student: any) {
    this.selectedStudent = student;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onStudentUpdateSuccess() {
    this.getAll();
  }
}
