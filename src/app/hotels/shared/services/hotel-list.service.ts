import { Injectable } from '@angular/core';
import { IHotel } from '../models/hotel';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelListServiceService {

  private readonly HOTEL_API = "api/hotels";
  constructor(private http: HttpClient) { }


  public getHotels(): Observable<IHotel[]> {
    return this.http.get<IHotel[]>(this.HOTEL_API).pipe(
      tap(hotels => console.log('Hotels: ', hotels)),
      catchError(this.handleError)
    );
  }

  public createHotels(hotel: IHotel): Observable<IHotel> {

    hotel = {
      ...hotel,
      imageUrl: 'assets/img/the-interior.jpg',
      id: this.generateId()
    };

    return this.http.post<IHotel>(this.HOTEL_API, hotel).pipe(catchError(this.handleError))
  }

  public updateHotel(hotel: IHotel): Observable<IHotel> {
    const url = `${this.HOTEL_API}/${hotel.id}222222`

    return this.http.put<IHotel>(url, hotel).pipe(
      catchError(this.handleError)
    )

  }

  public deleteHotel(hotelId: number): Observable<{}> {
    const url = `${this.HOTEL_API}/${hotelId}`

    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  public getHotelById(id: number): Observable<IHotel | undefined> {

    const url = `${this.HOTEL_API}/${id}`
    if (id === 0) {
      return of(this.getDefaultHotel());
    }
    return this.http.get<IHotel>(url).pipe(catchError(this.handleError));
  }

  public getDefaultHotel(): IHotel {
    return {
      id: 0,
      hotelName: "",
      description: "",
      imageUrl: "",
      price: 0,
      rating: 0
    }
  }


  private handleError(error: HttpErrorResponse) {

    let errorMessage: string;

    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      errorMessage = `An error occurred: ${error.error.message}`
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`

    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.' + '\n' + errorMessage));
  }

  private generateId(): number {
    return Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER));
  }
}



