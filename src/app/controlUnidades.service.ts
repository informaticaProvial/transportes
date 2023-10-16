import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportesOperativosInterface } from './interfaces/reportesOperativos.interface';
import { ResponseInterface } from './interfaces/responseI.interface';

@Injectable({
  providedIn: 'root'
})
export class ControlUnidadesService {

  private baseUrl = 'http://localhost:3000/reportes_operativos';
  private baseUrlTipoReportes = 'http://localhost:3000/tipos_reporte';
  private baseUrlReporte = 'http://localhost:3000/reportes_operativos_param';
  private baseUrlPatrullajes = 'http://localhost:3000/patrullajes';
  private baseUrlUnidades = 'http://localhost:3000/unidades';
  private baseUrlBrigadas = 'http://localhost:3000/brigadas'




  constructor(private http: HttpClient) {
   }

   getReportesOperativos(page: number, pageSize: number): Observable<any> {
    const url = `${this.baseUrl}?page=${page}&pageSize=${pageSize}`;
    return this.http.get(url);
  }
  

  obtenerOpcionesSituacionActual(): Observable<any> {
    return this.http.get(`${this.baseUrlTipoReportes}`);
  }

  getReporteOperativo(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getReporteOperativoParams(filtros: any, pageIndex: number, pageSize: number): Observable<any> {
    let queryParams = '';

    // Agregar parámetros de filtro a la URL si están presentes
    if (filtros) {
        queryParams += '?';
        if (filtros.filtroPatrulla) {
          queryParams += `filtroPatrulla=${filtros.filtroPatrulla}&`;
      }
        if (filtros.filtroSituacion) {
            queryParams += `filtroSituacion=${filtros.filtroSituacion}&`;
        }
        if (filtros.filtroSector) {
            queryParams += `filtroSector=${filtros.filtroSector}&`;
        }
        if (filtros.fechaInicio) {
            queryParams += `fechaInicio=${filtros.fechaInicio}&`;
        }
        if (filtros.fechaFin) {
            queryParams += `fechaFin=${filtros.fechaFin}&`;
        }
        if (filtros.filtroKl) {
          queryParams += `filtroKl=${filtros.filtroKl}&`;
      }
    }

      // Agregar parámetros de paginación a la URL
      queryParams += `pageIndex=${pageIndex}&pageSize=${pageSize}`;


      // Eliminar el último & si hay parámetros de filtro
      if (queryParams.endsWith('&')) {
          queryParams = queryParams.slice(0, -1);
      }

      const url = `${this.baseUrlReporte}/${queryParams}`;
      return this.http.get(url);
  }

  // get patrullajes por unidad
  getPatrullejes(unidad_num: any): Observable<any> {
    let queryParams = '';

    if (unidad_num) {
      queryParams += `?UNIDAD_NUM=${unidad_num}&`;
    }
    
    const url = `${this.baseUrlPatrullajes}/${queryParams}`;
    return this.http.get(url);
  }

  // get unidades
  getUnidades(): Observable<any> {
    return this.http.get(`${this.baseUrlUnidades}`);
  }
  
  // get brigadas
  getBrigadas(): Observable<any> {
    return this.http.get(`${this.baseUrlBrigadas}`);
  }

  updatePatrullaje(unidad_num: number, value: string): Observable<ResponseInterface> {
    return this.http.put<ResponseInterface>(`${this.baseUrlPatrullajes}/${unidad_num}`, value);
  }

  createReporteOperativo(reporteOperativo: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, reporteOperativo);
  }

  updateReporteOperativo(id: number, value: ReportesOperativosInterface): Observable<ResponseInterface> {
    return this.http.put<ResponseInterface>(`${this.baseUrl}/${id}`, value);
  }

  deleteReporteOperativo(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  addReporteOperativo(reporteOperativo: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, reporteOperativo);
}

  postReporteOperativo(form:ReportesOperativosInterface):Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(this.baseUrl, form);
  }
}
