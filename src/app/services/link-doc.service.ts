import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/post";
import {environment} from "../../environments/environment";
import {LinkDoc} from "../models/link-doc";
const API_URL = environment.apiUrl + '/linkdocs';
@Injectable({
  providedIn: 'root'
})
export class LinkDocService {


  constructor(private http: HttpClient) {
  }

  getAll(): Observable<LinkDoc[]> {
    return this.http.get<LinkDoc[]>(API_URL);
  }

  getAllByCategoryId(id:string): Observable<LinkDoc[]> {
    // console.log(API_URL+`/${id}`)
    return this.http.get<LinkDoc[]>(API_URL+`/${id}`);
  }

  create(post: Post): Observable<any> {
    return this.http.post<any>(API_URL, post);
  }
}
