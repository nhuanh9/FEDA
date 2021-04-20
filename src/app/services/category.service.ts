import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/post";
import {environment} from "../../environments/environment";
import {Category} from "../models/category";

const API_URL = environment.apiUrl + '/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(API_URL);
  }

  getById(id?: any): Observable<Category> {
    return this.http.get<Category>(API_URL + '/' + id);
  }
}
