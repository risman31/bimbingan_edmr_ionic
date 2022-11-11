import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  // qrdata : any;
  // createCode : any;


  title = 'app';
  elementType = 'url';
  value = '';
   
  public name: string;
  public npm: string;
  public foto: string;

  constructor(private storage: Storage, private navCtrl: NavController) {

    this.getPhoto();
  }

  // public create(){
  //   this.createCode = this.qrdata;
  // }

  // public clear(){
  //   this.createCode = '';
  // }

  handleRefresh(event) {
    setTimeout(() => {
      this.getPhoto();
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  };

  async getPhoto(){
    await this.storage.create();
    this.storage.get('isLoggedIn').then((val) => {
      console.log(val);
      this.name = val.nama;
      this.value = val.nama;
      this.npm = val.npm;
      // this.foto = `http://localhost/elearning_native/uploads/${val.photo}`;
    });
  }

  logout() {
    this.storage.clear();
    localStorage.clear();
    this.navCtrl.navigateRoot('/login');
  }

}
