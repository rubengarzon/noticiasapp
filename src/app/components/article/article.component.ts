import { Component, Input } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  @Input() article: Article;
  @Input() index: number;
  constructor(
    private platform: Platform,
    private iab: InAppBrowser,
    private actionSheetCtrl: ActionSheetController
  ) {}

  //open article in browser when clicked
  openArticle() {
    if (this.platform.is('android') || this.platform.is('ios')) {
      const browser = this.iab.create(this.article.url);
      browser.show();
    } else {
      window.open(this.article.url, '_blank');
    }
  }

  async onOpenMenu() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Compartir',
          icon: 'share-outline',
          handler: () => this.onShareArticle(),
        },
        {
          text: 'Favorito',
          icon: 'heart-outline',
          handler: () => this.onToogleFavorite(),
        },
        {
          text: 'Cancelar',
          icon: 'close-outline',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  onShareArticle() {
    console.log('share article');
  }

  onToogleFavorite() {
    console.log('toogle favorite');
  }
}
