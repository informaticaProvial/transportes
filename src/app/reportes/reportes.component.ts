import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


import { RoomInterface } from '../interfaces/room.interface';
import { IdGeneratorService } from '../id-generator.service';
import { RoomService } from '../room.service';
import { ResponseInterface } from '../interfaces/responseI.interface';
import { ControlUnidadesService } from '../controlUnidades.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
 // Importar la extensión autotable



@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {

  
  message: any;

   filtros = {
    filtroPatrulla: '',
    filtroSituacion: '',
    filtroSector: '',
    fechaInicio: '',
    fechaFin: '',
    filtroKl: ''
  };

  opcionesSector: string[] = ['CA-1 OCCIDENTE', 'CA-1 ORIENTE', 'CA-9 NORTE', 'CA-9 SUR', 'CA-2 OCCIDENTE', 'CA-2 ORIENTE', 'CA-9 SUR A', 'CA-10', 'RN-01',
  'RD PET-16', 'CA-13', 'RD PET-03', 'CA-14', 'RN-10', 'RN-14', 'CIUDAD', 'CITO-180', 'RN-1', 'RN-16', 'RD PET-11', 'RD-1', 'RD-4', 'RD-CHI-01', 'RN 7-E',
  'CA-16', 'RD-16', 'RD SCH-7', 'RD ESC-27', 'RN-11', 'SUPERVISIÓN CA-1 OCCIDENTE', 'SUPERVISIÓN CA-1 ORIENTE', 'SUPERVISIÓN CA-9 NORTE', 'SUPERVISIÓN CA-9 SUR',
  'SUPERVISIÓN CA-2 OCCIDENTE', 'SUPERVISIÓN CA-2 ORIENTE', 'SUPERVISIÓN CA-9 SUR A', 'SUPERVISIÓN CA-10', 'SUPERVISIÓN RN-01', 'SUPERVISIÓN RD PET-16', 'SUPERVISIÓN CA-13',
  'SUPERVISIÓN RD PET-03', 'SUPERVISIÓN CA-14', 'SUPERVISIÓN RN-10', 'SUPERVISIÓN RN-14', 'SUPERVISIÓN CIUDAD', 'SUPERVISIÓN CITO-180', 'SUPERVISIÓN RN-1', 'SUPERVISIÓN RN-16',
  'SUPERVISIÓN RD PET-11', 'SUPERVISIÓN RD-1', 'SUPERVISIÓN RD-4', 'SUPERVISIÓN RD-CHI-01', 'SUPERVISIÓN RN 7-E', 'SUPERVISIÓN CA-16', 'SUPERVISIÓN RD-16', 'SUPERVISIÓN RD SCH-7',
  'SUPERVISIÓN RD ESC-27', 'SUPERVISIÓN RN-11'];
  situacionActualOptions: any;
  reportesOperativos: any[] = [];
  pageIndex: number;
  pageSize: number;


  constructor(private http: HttpClient, private controlUnidadesService: ControlUnidadesService, private roomService: RoomService, private idGenerator: IdGeneratorService) { 
    this.pageIndex = 1;
    this.pageSize = 10;
  }

  ngOnInit() {

    // Llamar al metodo de los reportes operativos para filtrar
    this.filtroReportesOperativos();

     // Llamar al método de tu servicio para obtener las opciones de situación actual
     this.controlUnidadesService.obtenerOpcionesSituacionActual().subscribe(options => {
      this.situacionActualOptions = options;
    });
  }

  filtroReportesOperativos() {
    this.controlUnidadesService.getReporteOperativoParams(this.filtros, this.pageIndex, this.pageSize).subscribe(response => {
          this.reportesOperativos = response;
        },
        error => {
          console.error("Error al cargar los reportes operativos:", error);
        }
      );
  }

  limpiarFiltros() {
    this.filtros = {
        filtroPatrulla: '',
        filtroSituacion: '',
        filtroSector: '',
        fechaInicio: '',
        fechaFin: '',
        filtroKl: ''
    };

    // Llamar a la función de filtro nuevamente para aplicar los filtros limpios
    this.filtroReportesOperativos();
  }

  generarYDescargarPDF() {
    // Crear un nuevo documento PDF
    const doc = new jsPDF();


     // Agregar una imagen al PDF
    const imgData = 'assets/img/provial-logo.jpg'; // Cambia la ruta a la ubicación de tu imagen
    doc.addImage(imgData, 'JPG', 10, 10, 20, 20); // Ajusta las coordenadas y el tamaño de la imagen
    doc.text('Reportes Operativos', 40, 20); // Título, ajusta las coordenadas para que esté al lado de la imagen


    // Crear una matriz de filas de datos
    const data = this.reportesOperativos.map(report => [report.REPORTE_NUM, report.FECHA, report.HORA, report.UNIDAD_NUM, report.SECTOR, report.UBICACION, report.DIRECC_SENTIDO, report.REPORTE_TIPO]);

    // Definir los anchos personalizados para cada columna
    const columnWidths = [22, 25, 15, 20, 20, 25, 20, 40];

    const columnStyles = {
      0: { cellWidth: columnWidths[0] },
      1: { cellWidth: columnWidths[1] },
      2: { cellWidth: columnWidths[2] },
      3: { cellWidth: columnWidths[3] },
      4: { cellWidth: columnWidths[4] },
      5: { cellWidth: columnWidths[5] },
      6: { cellWidth: columnWidths[6] },
      7: { cellWidth: columnWidths[7] }
    };

    // Generar la tabla utilizando autoTable
    autoTable(doc, {
      head: [
        ['REPORTE', 'FECHA', 'HORA', 'UNIDAD', 'SECTOR', 'UBICACION', 'SENTIDO', 'SITUACION']
      ],
      body: data,
      startY: 15 + 20, // Ajusta la posición inicial de la tabla después del título y la imagen, añadiendo un espacio extra
      columnStyles: columnStyles 
    });

    // Generar el archivo PDF
    const pdfBlob = doc.output('blob');

    // Crear un enlace de descarga
    const link = document.createElement('a');
    link.href = URL.createObjectURL(pdfBlob);
    link.download = 'reportes_operativos.pdf';

    // Agregar el enlace al documento
    document.body.appendChild(link);

    // Simular un clic en el enlace para iniciar la descarga
    link.click();

    // Eliminar el enlace después de la descarga
    document.body.removeChild(link);
  }
    
  filtrarReportes() {
    console.log('filtro personalizado ', this.filtros)
  }

}
