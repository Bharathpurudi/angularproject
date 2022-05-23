import { Injectable } from '@angular/core';
import {httpCli}
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceModelService {

  constructor( private http: HttpClient) { }
}
