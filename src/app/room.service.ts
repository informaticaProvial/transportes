import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseInterface } from './interfaces/responseI.interface';
import { RoomInterface } from './interfaces/room.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private baseUrl = 'http://localhost:3000/rooms';


  constructor(private http: HttpClient) {
   }

  getRooms(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getRoom(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createRoom(room: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, room);
  }

  updateRoom(id: number, value: RoomInterface): Observable<ResponseInterface> {
    return this.http.put<ResponseInterface>(`${this.baseUrl}/${id}`, value);
  }

  deleteRoom(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  addRoom(room: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, room);
  }

  postRoom(form:RoomInterface):Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(this.baseUrl, form);
  }
}
