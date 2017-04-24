import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';

import { AppConfig } from './constants/app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private translate : TranslateService){

    //Initalize system language
    this.initLanguagePack();
  }

  initLanguagePack(){
    let translate : TranslateService = this.translate;

    //Set default language
    translate.setDefaultLang(AppConfig.defaultLang);
    translate.use(AppConfig.defaultLang);

    let browserLang : string = translate.getBrowserLang();
    if( browserLang.match(new RegExp(AppConfig.supportLangs)) ){
      //Switch to broswer language if we supported.
      //translate.use(browserLang);
    }

  }
}
