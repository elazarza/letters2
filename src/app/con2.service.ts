import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ConService {

  constructor(private http: HttpClient) { }

  insert(name, address, address2, color, dir, text, zipcode, city, city2, phone, email, oid, file) {
    const body = {name, address, address2, color, dir, text, zipcode, city, city2, phone, email, oid, file};
    return this.http.post<any>('http://otiotlabayit.tk/server/create.php', body)
  }
}
