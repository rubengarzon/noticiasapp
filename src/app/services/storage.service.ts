import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private localStorage: Storage | null = null;
  private localArticles: Article[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  get getLocalArticles() {
    return [...this.localArticles];
  }

  async init() {
    const storage = await this.storage.create();
    this.localStorage = storage;
    this.loadFavorites();
  }

  async saveRemoveArticle(article: Article) {
    const exists = this.localArticles.find(
      (localArticle) => localArticle.title === article.title
    );
    if (exists) {
      this.localArticles = this.localArticles.filter(
        (localArticle) => localArticle.title !== article.title
      );
    } else {
      this.localArticles = [article, ...this.localArticles];
    }
    this.localStorage.set('articles', this.localArticles);
  }

  //get articles from storage
  async loadFavorites() {
    try {
      const articles = await this.storage.get('articles');
      this.localArticles = articles || [];
    } catch (error) {}
  }

  articleInFavorites(article: Article) {
    return !!this.localArticles.find(
      (localArticle) => localArticle.title === article.title
    );
  }
}
