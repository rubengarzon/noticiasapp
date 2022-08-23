import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Article,
  ArticlesByCategoryAndPage,
  NewsResponse,
} from '../interfaces';
import { map } from 'rxjs/operators';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}
  // devuelve las noticias de la categoria business
  getTopHeadLines(): Observable<Article[]> {
    return this.http
      .get<NewsResponse>(
        `${apiUrl}top-headlines?country=us&category=business&pageSize=100`,
        {
          params: {
            apiKey,
          },
        }
      )
      .pipe(map(({ articles }) => articles));
  }
  // devuelve las noticias de una categoria determinada
  getTopHeadLinesByCategory(category: string): Observable<Article[]> {
    return this.http
      .get<NewsResponse>(
        `${apiUrl}top-headlines?country=us&category=${category}&pageSize=100`,
        {
          params: {
            apiKey,
          },
        }
      )
      .pipe(map(({ articles }) => articles));
  }
}
