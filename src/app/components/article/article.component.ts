import { Component, Input } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import {
  ActionSheetButton,
  ActionSheetController,
  Platform,
} from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { StorageService } from 'src/app/services/storage.service';

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
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private storageService: StorageService
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
    const articleInFavorite = this.storageService.articleInFavorites(
      this.article
    );

    const normalBtns: ActionSheetButton[] = [
      {
        text: articleInFavorite ? 'Eliminar favorito' : 'Favorito',
        icon: articleInFavorite ? 'heart' : 'heart-outline',
        handler: () => this.onToogleFavorite(),
      },
      {
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'cancel',
      },
    ];

    const shareBtn: ActionSheetButton = {
      text: 'Compartir',
      icon: 'share-outline',
      handler: () => this.onShareArticle(),
    };
    normalBtns.unshift(shareBtn);
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: normalBtns,
    });

    await actionSheet.present();
  }

  onShareArticle() {
    this.compartirNoticia();
  }

  onToogleFavorite() {
    this.storageService.saveRemoveArticle(this.article);
  }

  compartirNoticia() {
    const { title, source, url } = this.article;
    if (this.platform.is('cordova')) {
      this.socialSharing.share(title, source.name, '', url);
    } else {
      if (navigator.share) {
        navigator.share({
          title,
          text: title,
          url,
        });
      } else {
        console.log('No se puede compartir');
      }
    }
  }
}
