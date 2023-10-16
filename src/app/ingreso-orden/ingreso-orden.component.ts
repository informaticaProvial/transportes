import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { SeatsInterface } from '../interfaces/seats.interface';
import { IdGeneratorService } from '../id-generator.service';
import { ResponseInterface } from '../interfaces/responseI.interface';
import { SeatService } from '../seat.service';
import { RoomInterface } from '../interfaces/room.interface';
import { ControlUnidadesService } from '../controlUnidades.service';

@Component({
  selector: 'app-ingreso-orden',
  templateUrl: './ingreso-orden.component.html',
  styleUrls: ['./ingreso-orden.component.css']
})
export class IngresoOrdenComponent {
  formGroup: FormGroup;
  private baseUrl = 'http://localhost:3000/seats';
  seats: any;
  message: any;
  rooms: RoomInterface[] = [];
  selectedOption: any;

  brigadas: any;
  unidades: any;
  opcionesSector: string[] = ['CA-1 OCCIDENTE', 'CA-1 ORIENTE', 'CA-9 NORTE', 'CA-9 SUR', 'CA-2 OCCIDENTE', 'CA-2 ORIENTE', 'CA-9 SUR A', 'CA-10', 'RN-01',
  'RD PET-16', 'CA-13', 'RD PET-03', 'CA-14', 'RN-10', 'RN-14', 'CIUDAD', 'CITO-180', 'RN-1', 'RN-16', 'RD PET-11', 'RD-1', 'RD-4', 'RD-CHI-01', 'RN 7-E',
  'CA-16', 'RD-16', 'RD SCH-7', 'RD ESC-27', 'RN-11', 'SUPERVISIÓN CA-1 OCCIDENTE', 'SUPERVISIÓN CA-1 ORIENTE', 'SUPERVISIÓN CA-9 NORTE', 'SUPERVISIÓN CA-9 SUR',
  'SUPERVISIÓN CA-2 OCCIDENTE', 'SUPERVISIÓN CA-2 ORIENTE', 'SUPERVISIÓN CA-9 SUR A', 'SUPERVISIÓN CA-10', 'SUPERVISIÓN RN-01', 'SUPERVISIÓN RD PET-16', 'SUPERVISIÓN CA-13',
  'SUPERVISIÓN RD PET-03', 'SUPERVISIÓN CA-14', 'SUPERVISIÓN RN-10', 'SUPERVISIÓN RN-14', 'SUPERVISIÓN CIUDAD', 'SUPERVISIÓN CITO-180', 'SUPERVISIÓN RN-1', 'SUPERVISIÓN RN-16',
  'SUPERVISIÓN RD PET-11', 'SUPERVISIÓN RD-1', 'SUPERVISIÓN RD-4', 'SUPERVISIÓN RD-CHI-01', 'SUPERVISIÓN RN 7-E', 'SUPERVISIÓN CA-16', 'SUPERVISIÓN RD-16', 'SUPERVISIÓN RD SCH-7',
  'SUPERVISIÓN RD ESC-27', 'SUPERVISIÓN RN-11'];


  constructor(private http: HttpClient, private controlUnidadesService: ControlUnidadesService, private seatService: SeatService, private idGenerator: IdGeneratorService) { 

      this.formGroup = new FormGroup({
        sector_codigo: new FormControl(''),
        unidad_num: new FormControl(''),
        dia_turno: new FormControl(new Date()),
        unidad_brigada1: new FormControl(0),
        unidad_brigada2: new FormControl(0),
        hora_inicio: new FormControl(new Date()),
        hora_final: new FormControl(new Date()),
        odo_ant: new FormControl(0),
        odo_nue: new FormControl(0)
      });

  }

  ngOnInit() {
    this.getUnidades();
    this.getPatrullas();
  }
  
    onNameChanged(value: any) {
      console.log('F ', value);
    }
  
    onAgeChanged(value: any) {
      console.log(value);
    }
  
    getUnidades() {
      this.controlUnidadesService.getUnidades().subscribe(options => {
        this.unidades = options;
      });
      
    }

    getPatrullas() {
      this.controlUnidadesService.getBrigadas().subscribe(options => {
        this.brigadas = options;
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
      //this.getSeats();
    });
  }

  // send data
  postForm(formGroup: SeatsInterface) {
    console.log('form ', formGroup);

    //this.seatService.postSeat(formGroup).subscribe(data => {
    //this.message = "Asiento agregado con éxito";
    //this.getSeats();
   // });
    
   this.formGroup = new FormGroup({
    sector_codigo: new FormControl(''),
    unidad_num: new FormControl(''),
    dia_turno: new FormControl(new Date()),
    unidad_brigada1: new FormControl(0),
    unidad_brigada2: new FormControl(0),
    hora_inicio: new FormControl(new Date()),
    hora_final: new FormControl(new Date()),
    odo_ant: new FormControl(0),
    odo_nue: new FormControl(0)
  });
  }
}
