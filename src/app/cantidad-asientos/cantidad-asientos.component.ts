import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { SeatsInterface } from '../interfaces/seats.interface';
import { IdGeneratorService } from '../id-generator.service';
import { ResponseInterface } from '../interfaces/responseI.interface';
import { SeatService } from '../seat.service';
import { RoomInterface } from '../interfaces/room.interface';

@Component({
  selector: 'app-cantidad-asientos',
  templateUrl: './cantidad-asientos.component.html',
  styleUrls: ['./cantidad-asientos.component.css']
})
export class CantidadAsientosComponent {


  formGroup: FormGroup;
  private baseUrl = 'http://localhost:3000/seats';
  seats: any;
  message: any;
  rooms: RoomInterface[] = [];
  selectedOption: any;

  constructor(private http: HttpClient, private seatService: SeatService, private idGenerator: IdGeneratorService) { 

      this.formGroup = new FormGroup({
        id: new FormControl(this.idGenerator.generateId()),
        room_id: new FormControl(0),
        roww: new FormControl(''),
        number: new FormControl(0),
        status: new FormControl(0),
        price: new FormControl(0)
      });

      this.getSeats();
  }

  ngOnInit() {
    this.seatService.getSeats().subscribe(data => {
      //console.log('DataM', data);
    });
    this.getRooms();
    console.log(this.rooms);

  }
  
    onNameChanged(value: any) {
      console.log('F ', value);
    }
  
    onAgeChanged(value: any) {
      console.log(value);
    }
  
    getSeats() {
      this.http.get<ResponseInterface>('http://localhost:3000/seats').subscribe(data => {
        this.seats = data;
      });
    }

    getRooms() {
      this.http.get<RoomInterface>('http://localhost:3000/rooms').subscribe(data => {
        this.rooms.push(data);
        console.log('arr ' , this.rooms);
      });
    }
    

     
   editSeat(seat: SeatsInterface) {
    this.http.put('http://localhost:3000/seats/' + seat.id, seat).subscribe(res => {
      console.log(res);
    });
    /*this.movieService.updateMovie(movie.id, movie).subscribe(data => {
      console.log(data);

    })*/
  }

  deleteSeat(seat: SeatsInterface) {
    this.http.delete('http://localhost:3000/seats/' + seat.id).subscribe(res => {
      console.log(res);
      this.message = "Asiento eliminado con éxito";
      this.getSeats();
    });
  }

  // send data
  postForm(formGroup: SeatsInterface) {
    console.log('form ', formGroup);

    this.seatService.postSeat(formGroup).subscribe(data => {
    this.message = "Asiento agregado con éxito";
    this.getSeats();
    });
    
    this.formGroup = new FormGroup({
      id: new FormControl(this.idGenerator.generateId()),
      room_id: new FormControl(0),
      roww: new FormControl(''),
      number: new FormControl(0),
      status: new FormControl(0),
      price: new FormControl(0)
    });
  }
}

