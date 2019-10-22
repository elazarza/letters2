import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ConService {

  constructor(private http: HttpClient) { }

  insert(name,address,phone, file) {
    const body = {name, address, phone, file};
    return this.http.post<any>('http://localhost/server/create.php', body)
  }
}
