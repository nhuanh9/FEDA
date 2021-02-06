import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/post";
import {LinkDoc} from "../models/link-doc";
import {CommentForm} from "../models/comment";

const API_URL = environment.apiUrl + '/posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  getTop4(): Observable<Post[]> {
    return this.http.get<Post[]>(API_URL + '/top-4');
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(API_URL);
  }

  create(post: Post): Observable<any> {
    return this.http.post<any>(API_URL, post);
  }

  getAllByCategoryId(id: string): Observable<Post[]> {
    // console.log(API_URL+`/${id}`)
    return this.http.get<Post[]>(API_URL + `/categories/${id}`);
  }

  get(id: string): Observable<Post> {
    return this.http.get<Post>(API_URL + `/${id}`);
  }

  addComment(id, comment): Observable<CommentForm> {
    return this.http.post<CommentForm>(API_URL + `/${id}/comments`, comment);
  }
}
