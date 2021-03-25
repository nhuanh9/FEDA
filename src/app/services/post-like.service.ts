import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {LikePost} from "../models/like-post";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PostLikeService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<LikePost[]> {
    return this.http.get<LikePost[]>(API_URL + `/post-likes`);
  }


  like(likePost: LikePost): Observable<LikePost> {
    return this.http.post<LikePost>(API_URL + `/post-likes`, likePost);
  }

  unlike(likePost: LikePost): Observable<LikePost> {
    return this.http.post<LikePost>(API_URL + `/post-likes/unlike`, likePost);
  }

}
