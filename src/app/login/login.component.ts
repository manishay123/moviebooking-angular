import { AuthServiceService } from './../auth-service.service';
import { Router } from '@angular/router';
import { AppServiceService } from './../app-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({})

  isSubmit: boolean = false;
  isError: boolean = false;
  errorMessage = '';
  userSubscription: Subscription = new Subscription();
  constructor(private toastr: ToastrService, private authService: AuthServiceService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.userSubscription = this.authService.user.subscribe((user) => {
      if (user) {
        this.router.navigate(['./home']);
      }
    });

    this.form = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
      }
    );

  }


  onSubmit() {

    this.isSubmit = true;

    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);

    this.authService.loginCustomer(this.form.value).subscribe(data => {
      console.log(data);

      this.authService.loginData(data['user'], data['jwtAuthToken'], data['serverCurrentTime'], data['tokenExpirationTime'])

      this.toastr.success('Login Successfully.', 'Success');
      setTimeout(() => {
        window.location.href = "/home";
      }, 1000);


    }, error => {
      console.log(error);

      if (error.statusText = "OK") {
        this.toastr.error('Login Failed.', 'Error');
        this.errorMessage = error.error.message;
        this.isError = true
      }


    })

  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }



}
