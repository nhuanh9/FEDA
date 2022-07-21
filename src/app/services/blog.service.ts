import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Blog} from "../models/blog";

const API_URL = environment.apiUrl + '/blogs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClient: HttpClient) {
  }

  findAllPublicStatus(): Observable<Blog[]> {
    return this.httpClient.get(API_URL + '/find-all-public-status');
  }

  findAll(): Observable<Blog[]> {
    return this.httpClient.get(API_URL);
  }

  findAllByUserId(id: string): Observable<Blog[]> {
    return this.httpClient.get(API_URL + '/search-by-user-id?id=' + id);
  }

  add(blog: any):any {
    return this.httpClient.post(API_URL, blog);
  }

}
