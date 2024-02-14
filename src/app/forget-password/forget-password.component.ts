import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../auth-service.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from '../register/confirm-password.validator';
import { User } from '../user.model';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  isUsernameFind: boolean = false;

  user!: any;

  form = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    securityQuestion: new FormControl(''),
    answer: new FormControl(''),
  });

  forgetForm = new FormGroup({
    username: new FormControl(''),

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

  findUserName() {

    this.authService.forgot(this.forgetForm.controls['username'].value).subscribe(data => {
      this.toastr.success("User Name Found.", 'Success')
      this.user = data;
      this.isUsernameFind = true;
    }, error => {
      this.toastr.error(error.error.message, 'Error')
    })

  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.form.invalid) {
      console.log("form invalid");
      return;
    }

    let data: any = {
      'password': this.form.controls['password'].value,
      'securityQuestion': this.form.controls['securityQuestion'].value,
      'securityAnswer': this.form.controls['answer'].value,
    }

    this.authService.updatePassword(data, this.user.userName).subscribe(data => {
      console.log(data);
      this.form.reset();
      this.router.navigate(['./login']);
      this.toastr.success("Password reset successfully.", 'Success')

    }, error => {

      this.errorMessage = error.error.message;
      this.toastr.error(error.error.message, 'Error')
    }
    )



  }

}
