import { AppServiceService } from './../app-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { AuthServiceService } from '../auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    securityQuestion: new FormControl(''),
    answer: new FormControl(''),
  });

  submitted = false;
  errorMessage = '';

  questions = [
    { id: 1, name: "What is your pet name?" },
    { id: 2, name: "In which city you were born?" },
    { id: 3, name: "Your favorite food?" },
    { id: 4, name: "Which is your favorite color?" },
    { id: 5, name: "What is your friend name?" }
  ];

  constructor(private toastr: ToastrService, private authService: AuthServiceService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group(
      {
        username: ['', Validators.required],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', Validators.required, Validators.email],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        securityQuestion: [],
        answer: ['', Validators.required]

      },
      {

        validator: ConfirmPasswordValidator("password", "confirmPassword")

      },

    );
  }


  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }


  onReset(): void {
    this.submitted = false;
    this.errorMessage = '';
    this.form.reset();
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.form.invalid) {
      return;
    }

    let data: any = {
      'firstName': this.form.controls['firstname'].value,
      'lastName': this.form.controls['lastname'].value,
      'userName': this.form.controls['username'].value,
      'email': this.form.controls['email'].value,
      'password': this.form.controls['password'].value,
      'securityQuestion': this.form.controls['securityQuestion'].value,
      'securityAnswer': this.form.controls['answer'].value,

    }

    this.authService.createCusomer(data).subscribe(data => {
      console.log(data);
      this.form.reset();
      this.router.navigate(['./login']);
      this.toastr.success("Successfully Registered.", 'Success')

    }, error => {

      this.errorMessage = error.error.message;
      this.toastr.error("Something went wrong.", 'Error')
    }
    )



  }


}
