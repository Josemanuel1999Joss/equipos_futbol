import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipoModelService {

  baseUri: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  agregarEquipo(data): Observable<any> {
    let url = `${this.baseUri}/agregar`;
    return this.http.post(url, data, { headers: this.headers })
      .pipe(
        catchError(this.errorManager)
      );
  }

  getEquipos(): Observable<any> {
    let url = `${this.baseUri}/equipos`;
    return this.http.get(url);
  }

  getEquipo(id): Observable<any> {
    let url = `${this.baseUri}/equipo/${id}`;
    return this.http.get(url, { headers: this.headers })
      .pipe(
        catchError(this.errorManager)
      );
  }

  updateEquipo(id, data): Observable<any> {
    let url = `${this.baseUri}/actualizar/${id}`;
    return this.http.put(url, data, { headers: this.headers })
      .pipe(
        catchError(this.errorManager)
      );
  }

  deleteEquipo(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .pipe(
        catchError(this.errorManager)
      );
  }

  errorManager(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error: ${error.status}, Mensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
