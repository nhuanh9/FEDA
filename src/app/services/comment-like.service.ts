import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LikePost} from "../models/like-post";
import {environment} from "../../environments/environment";
import {LikeComment} from "../models/like-comment";

const API_URL = environment.apiUrl + '/comment-likes';

@Injectable({
  providedIn: 'root'
})
export class CommentLikeService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<LikeComment[]> {
    return this.http.get<LikeComment[]>(API_URL);
  }


  like(likeComment: LikeComment): Observable<LikeComment> {
    return this.http.post<LikePost>(API_URL, likeComment);
  }

  unlike(likeComment: LikeComment): Observable<LikeComment> {
    return this.http.post<LikeComment>(API_URL + `/unlike`, likeComment);
  }

}
