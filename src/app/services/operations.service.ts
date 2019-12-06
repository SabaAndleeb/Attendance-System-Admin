import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVER_URL } from 'app/config/config';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(private http: HttpClient) { }

  getOperation(endPoint : string , params? : any){
    const url = SERVER_URL + endPoint;
    return this.http.get(`${url}` , { headers : this.getHeaders() , params : params});
  }

  postOperation(endPoint : string, data: any){
    const url = SERVER_URL + endPoint;
    return this.http.post(`${url}`, data);
  }

  getHeaders(): HttpHeaders {
    let headers : HttpHeaders = new HttpHeaders();
    // if(localStorage.getItem(JWTOKEN))
    // headers = headers.append('Authorization', localStorage.getItem(JWTOKEN));
    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    headers = headers.append("Content-Type" ,  "application/json");
    headers = headers.append("Access-Control-Allow-Credentials" , "true");
    headers = headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Access-Control-Allow-Origin');
    return headers;
  }    
}
