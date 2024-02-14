import { Component } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../auth-service.service';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
   movie1!:Movie1;
  roleName!: string;
  movies: Movie[] = [];
  form: FormGroup = new FormGroup({
    'movieName': new FormGroup(''),
    'theatreName': new FormGroup(''),
    'seatAvailable': new FormGroup(''),

  });
  constructor(private authService: AuthServiceService, private toastr: ToastrService, private appService: AppServiceService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.roleName = this.authService.user.value?.user.roleName;
    this.loadData();
    this.form = this.formBuilder.group({
      movieName: ['', Validators.required],
      theatreName: ['', Validators.required],
      seatAvailable: ['', Validators.required],
    });


  }

  loadData(): void {

    this.appService.getAllMovie().subscribe(data => {

      console.log(data);
      this.movies = data;
    })
  }

  resetProperties() {
    this.appService.getAllMovie().subscribe(data => {
      console.log(data);
      this.movies = data;
    })
  }


  onsearch(id: any): void {

    console.log(id);
    if (id) {
      this.appService.searchMovieByName(id).subscribe(data => {

        this.movies = data;

      });

      console.log(this.movies);


    } else {
      this.loadData();
    }



  }


  deleteItem(id: any): void {

    this.appService.deleteMovie(id).subscribe(data => {
      const index = this.movies.findIndex(x => x.movieId = id);
      this.movies.splice(index, 1)
      console.log(data);
      this.toastr.success("Successfully Deleted");

    });

  }


  updateItem(id: any): void {
    this.movie1 = {
      movieName: this.form.controls['movieName'].value,
      theatreName: this.form.controls['theatreName'].value,
      seatAvailable: this.form.controls['seatAvailable'].value,
    };
    this.appService.updateMovie(id,this.movie1).subscribe(data => {
      console.log(data);
      this.toastr.success("Successfully Updated");

    });

  }
}

interface Movie {
  movieId: number;
  movieName: string,
  theatreName: string,
  seatAvailable: number

}
interface Movie1 {
 
  movieName: string,
  theatreName: string,
  seatAvailable: number

}


