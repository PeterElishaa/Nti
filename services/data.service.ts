import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http : HttpClient) { }
  apiURL = 'http://localhost:3000/project'

  getProducts():Observable<any>{
return this._http.get<any>(this.apiURL);
  }

  projectAPIURL = 'http://localhost:3000/project'
  saveNewProduct(data:any):Observable<any>{
   return this._http.post<any>(this.projectAPIURL,data)
  }
}
