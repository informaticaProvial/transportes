import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


import { ControlUnidadesService } from '../controlUnidades.service';
import { ReportesOperativosInterface } from '../interfaces/reportesOperativos.interface';
import { IdGeneratorService } from '../id-generator.service';
import { Time } from '@angular/common';

import { FilterPipe } from '../filter.pipe'; // Importa tu filtro personalizado aquí


interface ReporteOperativoResponse {
  status: number;
  error: any;
  response: number;
}

interface ReporteOperativoI {
  REPORTE_NUM: number;
  FECHA: string;
  HORA: Time;
  UNIDAD_NUM: string;
  SECTOR: string;
  UBICACION: number;
  DIRECC_SENTIDO: string;
  REPORTE_TIPO: string;
  USUARIO: string;
  VALIDADO: number;
}



@Component({
  selector: 'app-controlUnidades',
  templateUrl: './controlUnidades.component.html',
  styleUrls: ['./controlUnidades.component.css']
})
export class ControlUnidadesComponent {

  formGroup: FormGroup;
  private baseUrl = 'http://localhost:3000/reportes_operativos';
  reportesOperativos: any;
  message: any;
  tempReleaseDate: Date;
  situacionActualOptions: any;
  filtro: string = ''; // Variable para el filtro
  opcionesSentido: string[] = ['SUR - NORTE', 'NORTE - SUR', 'OCCIDENTE - ORIENTE', 'ORIENTE - OCCIDENTE', 'BIDIRECCIONAL'];
  opcionesSector: string[] = ['CA-1 OCCIDENTE', 'CA-1 ORIENTE', 'CA-9 NORTE', 'CA-9 SUR', 'CA-2 OCCIDENTE', 'CA-2 ORIENTE', 'CA-9 SUR A', 'CA-10', 'RN-01',
  'RD PET-16', 'CA-13', 'RD PET-03', 'CA-14', 'RN-10', 'RN-14', 'CIUDAD', 'CITO-180', 'RN-1', 'RN-16', 'RD PET-11', 'RD-1', 'RD-4', 'RD-CHI-01', 'RN 7-E',
  'CA-16', 'RD-16', 'RD SCH-7', 'RD ESC-27', 'RN-11', 'SUPERVISIÓN CA-1 OCCIDENTE', 'SUPERVISIÓN CA-1 ORIENTE', 'SUPERVISIÓN CA-9 NORTE', 'SUPERVISIÓN CA-9 SUR',
  'SUPERVISIÓN CA-2 OCCIDENTE', 'SUPERVISIÓN CA-2 ORIENTE', 'SUPERVISIÓN CA-9 SUR A', 'SUPERVISIÓN CA-10', 'SUPERVISIÓN RN-01', 'SUPERVISIÓN RD PET-16', 'SUPERVISIÓN CA-13',
  'SUPERVISIÓN RD PET-03', 'SUPERVISIÓN CA-14', 'SUPERVISIÓN RN-10', 'SUPERVISIÓN RN-14', 'SUPERVISIÓN CIUDAD', 'SUPERVISIÓN CITO-180', 'SUPERVISIÓN RN-1', 'SUPERVISIÓN RN-16',
  'SUPERVISIÓN RD PET-11', 'SUPERVISIÓN RD-1', 'SUPERVISIÓN RD-4', 'SUPERVISIÓN RD-CHI-01', 'SUPERVISIÓN RN 7-E', 'SUPERVISIÓN CA-16', 'SUPERVISIÓN RD-16', 'SUPERVISIÓN RD SCH-7',
  'SUPERVISIÓN RD ESC-27', 'SUPERVISIÓN RN-11'];
  pageIndex: number;
  pageSize: number;
  showCard = false;
  unidadInfo = '';
  unidad_num: any;
  unidadInfoMap: Map<string, string> = new Map<string, string>();


  constructor(private http: HttpClient, private controlUnidadesService: ControlUnidadesService, private idGenerator: IdGeneratorService, private filterPipe: FilterPipe) { 
    this.tempReleaseDate = new Date();
      this.formGroup = new FormGroup({
        reporte_num: new FormControl(0),
        fecha: new FormControl(''),
        hora: new FormControl(''),
        patrulla: new FormControl({ value: '', disabled: true }),
        sector: new FormControl(''),
        ubicacion: new FormControl(''),
        sentido: new FormControl(''),
        situacion: new FormControl(''),
        usuario: new FormControl(''),
        valido: new FormControl(0)
      });

      this.pageIndex = 1;
      this.pageSize = 10;
      this.ngOnInit();
  }

  ngOnInit() {
    // Llamar al metodo de los reportes operativos
    this.getReportesOperativos();

    // Llamar al método de tu servicio para obtener las opciones de situación actual
    this.controlUnidadesService.obtenerOpcionesSituacionActual().subscribe(options => {
      this.situacionActualOptions = options;
    });
  }
  
    onNameChanged(value: any) {
    }
  
    onAgeChanged(value: any) {
    }
  
    toggleCard(unidadNum: string) {
      this.showCard = !this.showCard;
      this.unidad_num = unidadNum;
      this.controlUnidadesService.getPatrullejes(unidadNum).subscribe(response => {
        
        if (response.length > 0) {
          this.unidadInfo  = response[0].INFO;// Accede a la propiedad INFO del primer objeto en el array
          console.log( this.unidadInfo ); // Debería mostrar el contenido de INFO
        } else {
          console.log('No se encontraron datos');
        }

          },
          error => {
            console.error("Error al cargar los patrullajes:", error);
          }
        );
      if (this.showCard) {
        this.unidadInfo = this.unidadInfoMap.get(unidadNum) || ''; // Obtén la información previamente guardada
        
      } else {
        this.unidadInfoMap.set(unidadNum, this.unidadInfo); // Almacena la información en el mapa
        //this.unidadInfo = ''; // Limpia el campo de texto
      }
    }
    
    cancelar() {
      this.showCard = !this.showCard;
    }

    guardarCard(){
      this.controlUnidadesService.updatePatrullaje(this.unidad_num, this.unidadInfo).subscribe(response => {
        console.log('se actualizo ' + response.result + response.status);
      },
      error => {
        console.error("Error al cargar los reportes operativos:", error);
      }
    );
      console.log('guardar ' + this.unidadInfo + 'num ' + this.unidad_num);
      this.unidadInfoMap.set(this.unidadInfo, this.unidad_num);

    }

    getReportesOperativos() {
      this.controlUnidadesService.getReportesOperativos(this.pageIndex, this.pageSize).subscribe(response => {
            this.reportesOperativos = response;
          },
          error => {
            console.error("Error al cargar los reportes operativos:", error);
          }
        );
    }

    
   editReporteOperativo(ro: ReporteOperativoI) {
      let ultimoNumeroReporte: number = ro.REPORTE_NUM + 1;    // Incrementar el último número de reporte

      const fechaActual = new Date(); // Obtener la fecha actual
      const horaActual = new Date().toLocaleTimeString(); // Obtener la hora actual

      this.formGroup.setValue({
        reporte_num: ultimoNumeroReporte,
        fecha: fechaActual.toISOString().split('T')[0],
        hora: horaActual,
        patrulla: ro.UNIDAD_NUM,
        sector: ro.SECTOR,
        ubicacion: ro.UBICACION,
        sentido: ro.DIRECC_SENTIDO,
        situacion: this.situacionActualOptions,
        usuario: ro.USUARIO,
        valido: ro.VALIDADO
      });
    }

  deleteReporteOperativo(ro: ReporteOperativoI) {
    this.http.delete('http://localhost:3000/reportes_operativos/' + ro.REPORTE_NUM).subscribe(res => {
      this.message = "Reporte operativo eliminado con éxito";
      this.getReportesOperativos();
    });
  }

  // send data
  postForm(formGroup: ReportesOperativosInterface) {

    console.log('form ', formGroup);
    //formGroup.FECHA = 

    this.controlUnidadesService.postReporteOperativo(formGroup).subscribe(data => {
     this.message = "Reporte Operativo actualizado con éxito";
     console.log('data ', data);
     this.getReportesOperativos();
    });
    
    
    this.formGroup = new FormGroup({
      reporte_num: new FormControl(0),
        fecha: new FormControl(''),
        hora: new FormControl(''),
        patrulla: new FormControl({ value: '', disabled: true }),
        sector: new FormControl({ value: '', disabled: true }),
        ubicacion: new FormControl(''),
        sentido: new FormControl(''),
        situacion: new FormControl(''),
        usuario: new FormControl(''),
        valido: new FormControl(0)
    });
  }

  filtrarReportes() {
    if (this.filtro === '') {
      // Si el filtro está vacío, carga todos los datos originales
      this.getReportesOperativos();
    } else {
      // Aplica el filtro personalizado a los datos
      this.reportesOperativos = this.filterPipe.transform(this.reportesOperativos, this.filtro);
    }
  }
  

  
}
