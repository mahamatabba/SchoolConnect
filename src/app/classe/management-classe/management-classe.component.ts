import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../Service/user.service';
import { SidebarComponent } from '../../Admin/sidebar/sidebar.component';
import { Class } from '../../Interface/Class';

@Component({
  selector: 'app-management-classe',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './management-classe.component.html',
  styleUrls: ['./management-classe.component.scss'],
})
export class ManagementClasseComponent implements OnInit {
  classes: Class[] = [];
  isCollapsed = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses(): void {
    this.userService.getClasses().subscribe({
      next: (data: any) => {
        this.classes = data;
        console.log('Classes loaded:', this.classes);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des classes', error);
      },
    });
  }

  viewClassDetails(classId: string): void {
    console.log(`Voir détails pour la classe ID: ${classId}`);
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  getColor(index: number): string {
    const colors = ['#F87171', '#60A5FA', '#FBBF24', '#34D399'];
    return colors[index % colors.length];
  }
}
