import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public categories: string[] = [
    'breaking-news',
    'world',
    'nation',
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology',
  ];

  public articles: Article[] = [];

  public selectedCategory: string = this.categories[0];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.newsService
      .getTopHeadLinesByCategory(this.selectedCategory)
      .subscribe((articles) => {
        this.articles = articles;
      });
  }

  segmentChanged(event: any) {
    this.selectedCategory = event.detail.value;
    this.newsService
      .getTopHeadLinesByCategory(this.selectedCategory)
      .subscribe((articles) => {
        this.articles = articles;
      });
  }
}
