import { AuthServiceService } from './auth-service.service';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  loadedUser?: User;

  headers: any;
  serviceUrl: string = "http://localhost:8080/api/v1.0/moviebooking/";

  constructor(private http: HttpClient, private authService: AuthServiceService) {
    const user = localStorage.getItem('userData');

    if (!user) return;

    const parsedUser: {
      user: any;
      _token: string;
      serverCurrentTime: number;
      _tokenExpirationTime: number;
    } = JSON.parse(user);
    this.loadedUser = new User(
      parsedUser.user,
      parsedUser._token,
      parsedUser.serverCurrentTime,
      parsedUser._tokenExpirationTime
    );

  }


  getAllMovie(): Observable<any> {
    return this.http.get<any>(this.serviceUrl + "movie/all");
  }

  addMovie(movie: any): Observable<any> {
    return this.http.post<any>(this.serviceUrl + "movie/add", movie);
  }

  bookTicket(data: any, movieId: any): Observable<any> {
    return this.http.post<any>(this.serviceUrl + "ticket/book/" + movieId, data);
  }


  deleteMovie(id: any): Observable<any> {
    return this.http.delete<any>(this.serviceUrl + "movie/delete" + "/" + id);
  }
  updateMovie(id: any, movie:any): Observable<any> {
    return this.http.put<any>(this.serviceUrl + "movie/update" + "/" + id, movie);
  }
  searchMovieById(id: any): Observable<any> {
    console.log(id);

    return this.http.get<any>(this.serviceUrl + "movie/search/" + id);
  }


  searchMovieByName(name: any): Observable<any> {

    return this.http.get<any>(this.serviceUrl + "movie/searchMovieName/" + name);
  }

  getBookedTable(): Observable<any> {
    return this.http.get<any>(this.serviceUrl + "ticket/booked_table");
  }

  handleError(errorResponse: HttpErrorResponse) {
    return throwError(errorResponse.error.message);
  }

}

