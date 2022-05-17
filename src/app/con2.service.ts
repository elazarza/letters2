import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class ConService {
  constructor(private http: HttpClient) {}

  insert(
    name,
    address,
    address2,
    color,
    dir,
    text,
    zipcode,
    city,
    city2,
    phone,
    email,
    oid,
    file
  ) {
    const body = {
      name,
      address,
      address2,
      color,
      dir,
      text,
      zipcode,
      city,
      city2,
      phone,
      email,
      oid,
      file,
    };
    return this.http.post<any>("https://ez-net.net/server/create.php", body);
  }

  count(type, date) {
    const body = { type, date };
    return this.http.post<any>("https://ez-net.net/server/count.php", body);
  }

  getCount() {
    const body = { type: "getcount" };
    return this.http.post<any>("https://ez-net.net/server/count.php", body);
  }
}
