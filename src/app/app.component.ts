import { AuthServiceService } from './auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'store';

  error: string | null = null;
  constructor(private authService: AuthServiceService) { }

  ngOnInit() {

    this.authService.timeout.subscribe((isTimeOut) => {

      if (isTimeOut)
        this.error = 'Your session is expired. Please Login again!';

    });
    this.authService.autoLogin();
  }

  handleError() {
    this.error = null;
  }

}
