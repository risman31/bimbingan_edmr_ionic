import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { NavController, Platform } from '@ionic/angular';
//import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public router:Router,
    private storage: Storage,
    private navCtrl: NavController,
    private platform: Platform
    
    //private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    
    await this.storage.create();
    this.platform.ready().then(() => {
      //this.statusBar.styleDefault();
      
    });

    this.storage.get('isLoggedIn').then((val) => {
      if (val === null || val === undefined || val === '') {
        this.router.navigateByUrl('/splash');
        // this.navCtrl.navigateRoot('/login');
      } else {
        this.navCtrl.navigateRoot('/tabs/tab1');
      }
    });

    
   
  }
}
