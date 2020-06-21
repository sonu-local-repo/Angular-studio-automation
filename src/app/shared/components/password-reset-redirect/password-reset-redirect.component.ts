import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { API_URL_DOMAIN } from '@shared/configs/globals';

@Component({
  selector: 'app-password-reset-redirect',
  templateUrl: './password-reset-redirect.component.html',
  styleUrls: ['./password-reset-redirect.component.scss']
})

@NgModule({
  imports: [
    BrowserModule
  ]
})

export class PasswordResetRedirectComponent implements OnInit {
  token = '';
  error = false;
  message = '';
  formGroup: FormGroup;
  passwordVisible = false;
  repasswordVisible = false;
  successful = false;
  serverError = false;
  errorMessage = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      password: ['', Validators.required],
      repassword: ['', Validators.required]
    }, { validator: this.checkPasswords });
    this.token = this.activatedRoute.snapshot.queryParams.token;
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.value.password;
    const repassword = group.value.repassword;
    if (password === repassword) {
      return null;
    } else {
      return { mismatch: true };
    }
  }

    passwordRetype($event: KeyboardEvent) {
    this.serverError = false;
    this.errorMessage = '';

  }
  resetPassword() {
    if (this.formGroup.valid) {
      const url = `${API_URL_DOMAIN}/auth/reset/confirm`;
      const data = {
        token: this.token,
        password: this.formGroup.value.password
      };
      this.http.post(url, data).subscribe(res => {
        this.successful = res as boolean;
        if (this.successful) {
          this.message = 'Password reset successfully. You will be redirected to login page';
          setTimeout(() => {
            this.router.navigateByUrl('/auth/login');
          }, 3000);
        }
      },
        (error) => {
          this.serverError = true;
          this.errorMessage = 'Invalid Token. Please try again';
        }
      );
    }
  }

}
