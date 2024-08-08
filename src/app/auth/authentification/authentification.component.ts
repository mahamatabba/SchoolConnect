import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Service/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.scss'
})
export class AuthentificationComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+?[1-9]\\d{1,14}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authService.login(loginData).subscribe({
        next: (response) => {
          const role = this.authService.getUserRole();
          this.redirectToDashboard(role);
        },
        error: (err) => {
          console.error('Login failed', err);
          this.errorMessage = 'Login failed. Please check your credentials.';
        },
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }

  navigateToSection(sectionId: string) {
    this.router.navigate([`/${sectionId}`]);
  }

  /**
   * Redirige l'utilisateur vers le tableau de bord approprié en fonction de son rôle.
   * @param role Le rôle de l'utilisateur.
   */
  private redirectToDashboard(role: string | null): void {
    switch (role) {
      case 'Administrator':
        this.router.navigate(['/admin']);
        break;
      case 'Teacher':
        this.router.navigate(['/teacher']);
        break;
      case 'Student':
        this.router.navigate(['/student']);
        break;
      default:
        console.log(role)
        this.errorMessage = 'Rôle non reconnu. Veuillez vérifier votre compte.';
    }
  }

}
