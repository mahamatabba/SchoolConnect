import { UserService } from './../../Service/user.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Output() toggleSidebarEvent = new EventEmitter<boolean>();
  isCollapsed = false;
  user: any;

  constructor(private _userService: UserService) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.toggleSidebarEvent.emit(this.isCollapsed);
  }

  ngOnInit(): void {
    this.getAll();
  }

  private getAll() {
    this._userService.getAll().subscribe({
      next: (data) => {
        this.user = data;
        console.log('User data:', data);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données', error);
      }
    });
  }
}
