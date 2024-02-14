import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from '../app-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-movie',
  templateUrl: './book-movie.component.html',
  styleUrls: ['./book-movie.component.css']
})
export class BookMovieComponent {

  movie!: Movie;
  movieId!: number;

  postData!: BookMovie;

  form: FormGroup = new FormGroup({
    'noOfSeats': new FormGroup(''),
  });


  constructor(private toastr: ToastrService, private appService: AppServiceService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      noOfSeats: ['', Validators.required],
    });


    this.route.params.subscribe((params: any) => {
      this.movieId = params['id'];
    });

    this.setMovieData();


  }

  setMovieData(): void {

    this.appService.searchMovieById(this.movieId).subscribe(data => {

      this.movie = data;

    });

  }

  onSubmit() {

    if (this.form.invalid) {
      this.toastr.error("Please Enter atleast 1 seat quantity.", 'Error');
      return;
    }

    this.postData = {
      movieName: this.movie.movieName,
      bookedSeats: this.form.controls['noOfSeats'].value,
    };


    this.appService.bookTicket(this.postData, this.movie.movieId).subscribe(data => {

      this.toastr.success("Ticket Booked Successfully.", 'Success');
      this.router.navigate(['/home']);


    }, error => {


      this.toastr.error(error.error.message, 'Error');
    })
  }


}




interface BookMovie {
  movieName: string,
  bookedSeats: number,
}


interface Movie {
  movieId: number;
  movieName: string,
  theatreName: string,
  seatAvailable: number

}

