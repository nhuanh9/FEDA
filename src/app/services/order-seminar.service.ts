import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LinkDoc} from "../models/link-doc";
import {OrderSeminar} from "../models/order-seminar";
import {Post} from "../models/post";

const API_URL = environment.apiUrl + '/order-seminars';

@Injectable({
  providedIn: 'root'
})
export class OrderSeminarService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<OrderSeminar[]> {
    return this.http.get<OrderSeminar[]>(API_URL);
  }

  create(orderSeminar: OrderSeminar): Observable<any> {
    return this.http.post<any>(API_URL, orderSeminar);
  }
}
