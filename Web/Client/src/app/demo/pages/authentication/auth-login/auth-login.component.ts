import { Component, inject, Injectable } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../guards/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-auth-login',
  imports: [RouterModule, FormsModule, CommonModule, HttpClientModule],
  providers: [AuthService], 
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
@Injectable({
  providedIn: 'root'  
})
export class AuthLoginComponent {
  private toastr = inject(ToastrService);
  private authService = inject(AuthService);
  private router = inject(Router);

  model = { email: '', password: '' };
  isValidFormSubmitted = false;
  loginData = {
    email: '',
    password: ''
  };

  onSubmit(form: NgForm) {
    this.isValidFormSubmitted = true;
    if (form.invalid) {
      this.isValidFormSubmitted = false;
      return;
    }
    this.authService.login(this.model).subscribe({
      next: (data: any) => {
        if (!data || data === false) {
          this.toastr.error('You have no permissions', 'Please contact your admin');
          localStorage.clear();
          return;
        }
        if (data.accessToken) {
          if (this.authService.loggedIn()) {
            this.router.navigate(['dashboard/default']);
          } else {
            this.toastr.warning('Session timed out');
            this.authService.logout();
          }
        } else {
          if (!data.ok && data.statusText === 'Unauthorized') {
            this.toastr.error('Email or password is not correct', 'Error');
          } else {
            this.toastr.error('Internet connection error', 'Error');
          }
        }
      },
      error: (error) => {
        console.error('Failed to login', error);
        this.toastr.error('Login failed due to server error', 'Error');
      }
    });
  }
}
