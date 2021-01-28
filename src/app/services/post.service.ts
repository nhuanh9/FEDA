import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/post";

const API_URL = environment.apiUrl + '/posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  getTop4(): Observable<Post[]> {
    return this.http.get<Post[]>(API_URL+'/top-4');
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(API_URL);
  }

  create(post: Post): Observable<any> {
    return this.http.post<any>(API_URL, post);
  }
}
