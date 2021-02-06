import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LinkDoc} from "../models/link-doc";
import {Image} from "../models/image";
import {Post} from "../models/post";

const API_URL = environment.apiUrl + '/images';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Image[]> {
    return this.http.get<Image[]>(API_URL);
  }

  create(image: Image): Observable<any> {
    return this.http.post<any>(API_URL, image);
  }

  getAllByPostId(id: number): Observable<Image[]> {
    return this.http.get<Image[]>(API_URL + `/${id}`);
  }
}
