import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/post";
import {LinkDoc} from "../models/link-doc";
import {CommentForm} from "../models/comment";
import {LikePost} from "../models/like-post";

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

  getAllByLikes(): Observable<Post[]> {
    return this.http.get<Post[]>(API_URL + '/order-by-likes');
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(API_URL);
  }
  getAllAdminPost(): Observable<Post[]> {
    return this.http.get<Post[]>(API_URL+'/admin');
  }

  create(post: Post): Observable<any> {
    return this.http.post<any>(API_URL, post);
  }

  getAllByCategoryId(id: string): Observable<Post[]> {
    return this.http.get<Post[]>(API_URL + `/categories/${id}`);
  }

  getAllByDes(des: string): Observable<Post[]> {
    return this.http.get<Post[]>(API_URL + `/des/${des}`);
  }

  get(id: string): Observable<Post> {
    return this.http.get<Post>(API_URL + `/${id}`);
  }

  addComment(id, comment): Observable<CommentForm> {
    return this.http.post<CommentForm>(API_URL + `/${id}/comments`, comment);
  }

  getAllLikeById(id): Observable<LikePost[]> {
    return this.http.get<LikePost[]>(API_URL + '/' + id + '/post-likes');
  }
}
