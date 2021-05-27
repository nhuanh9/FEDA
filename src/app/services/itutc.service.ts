import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Itutc} from "../models/itutc";

const API_URL = environment.apiUrl + '/itutcs';

@Injectable({
  providedIn: 'root'
})
export class ItutcService {


  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Itutc[]> {
    return this.http.get<Itutc[]>(API_URL);
  }
}
