import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, NewsResponse } from '../interfaces';
import { map } from 'rxjs/operators';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getTopHeadLines(): Observable<Article[]> {
    return this.http
      .get<NewsResponse>(`${apiUrl}`)
      .pipe(map(({ articles }) => articles));
  }

  getTopHeadLinesByCategory(category: string): Observable<Article[]> {
    return this.http
      .get<NewsResponse>(
        `${apiUrl}&topic=${category}`
      )
      .pipe(map(({ articles }) => articles));
  }
}
