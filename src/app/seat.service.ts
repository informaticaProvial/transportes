import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseInterface } from './interfaces/responseI.interface';
import { SeatsInterface } from './interfaces/seats.interface';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  private baseUrl = 'http://localhost:3000/seats';


  constructor(private http: HttpClient) {
   }

  getSeats(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getSeat(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createSeat(seat: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, seat);
  }

  updateSeat(id: number, value: SeatsInterface): Observable<ResponseInterface> {
    return this.http.put<ResponseInterface>(`${this.baseUrl}/${id}`, value);
  }

  deleteSeat(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  addSeat(seat: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, seat);
  }

  postSeat(form:SeatsInterface):Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(this.baseUrl, form);
  }
}
