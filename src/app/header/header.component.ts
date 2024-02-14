import { Router } from '@angular/router';
import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name!: string;
  userName!: string;
  roleName !: string;
  isLoggedin: boolean = false;
  constructor(private authService: AuthServiceService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.roleName = this.authService.user.value?.user.roleName;
    this.userName = this.authService.user.value?.user.userName;
    this.name = this.authService.user.value?.user.firstName + " " + this.authService.user.value?.user.lastName;

    if (this.authService.checklogin()) {
      this.isLoggedin = true;
    }

  }


  logout() {
    this.authService.logout();
    this.toastr.success("Logout Succesfully.", 'Success')
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);


  }


}
