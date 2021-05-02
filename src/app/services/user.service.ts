import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from "../models/user";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(API_URL + '/register', user);
  }

  registerSuccess(token: string): Observable<any> {
    return this.http.get<any>(API_URL + '/confirm-account?token=' + token);
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(API_URL + '/login', user);
  }

  // passwordForgot(forgotPassword: ForgotPassword): Observable<ForgotPassword> {
  //   return this.http.post<ForgotPassword>(API_URL + '/forgot-password', forgotPassword);
  // }

  newPassword(user: User, id: number): Observable<User> {
    return this.http.put<User>(API_URL + `/new-password/${id}`, user);
  }

  userDetail(id: string): Observable<User> {
    return this.http.get<User>(API_URL + `/users/${id}`);
  }

  getUserProfile(id: any): Observable<User> {
    return this.http.get<User>(API_URL + `/users/${id}`);
  }

  getTopPosts(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + `/users/top-posts`);
  }

  getTopLinkDocs(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + `/users/top-linkdocs`);
  }

  getTopComments(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + `/users/top-comments`);
  }

  updatePassword(username: string, user: User): Observable<User> {
    console.log(API_URL + `/users/${username}/new-password-username`);
    return this.http.put<User>(API_URL + `/users/${username}/new-password-username`, user);
  }

  updateUserProfile(id: number, user: User): Observable<User> {
    return this.http.put<User>(API_URL + `/users/${id}`, user);
  }

  getUserPosts(id?: any): Observable<any> {
    return this.http.get<any>(API_URL + '/users/' + id + '/posts');
  }
  getUserLinkdocs(id?: any): Observable<any> {
    return this.http.get<any>(API_URL + '/users/' + id + '/linkdocs');
  }

  updatePost(id?: any, post?: any): Observable<any> {
    return this.http.put(API_URL + '/users/' + id + '/posts', post);
  }

  deletePost(idUser?: any, idPost?: any): Observable<any> {
    return this.http.get(API_URL + '/users/' + idUser + '/posts/' + idPost);
  }
}
