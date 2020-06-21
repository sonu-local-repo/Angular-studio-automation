import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { API_URL_DOMAIN } from '@shared/configs/globals';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  resetForm: FormGroup;
  emailFound = false;
  enableButton = true;
  message = '';
  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  resetPassword() {
    if (this.resetForm.valid) {
      this.enableButton = false;
      this.http.post(`${API_URL_DOMAIN}/auth/reset`, { email: this.resetForm.value.email }).subscribe((data) => {
        this.emailFound = data as boolean;
        if (this.emailFound) {

          this.message = 'Password reset email sent. Please check your inbox';
        } else {
          this.message = 'Email not found. Please try again';
          // this.enableButton = true;
        }
      });
    } else {
      this.resetForm.reset();
    }
    event.preventDefault();
    event.stopPropagation();
  }

  onEmailChange($event: KeyboardEvent) {
    this.message = '';
  }
}
