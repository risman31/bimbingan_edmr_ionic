import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import {
  NavController,
  ToastController,
  LoadingController,
} from '@ionic/angular';
// import axios from 'axios';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public username: string = '';
  public password: string = '';

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private storage: Storage
  ) {}

  ngOnInit() {}

  async presentToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      color: 'danger',
      position: 'top',
    });
    toast.present();
  }
  async login() {
    await this.storage.create();
    if (this.username === '') {
      this.presentToast('NPM cannot be empty!');
    } else if (this.password === '') {
      this.presentToast('Password cannot be empty');
    } else {
      const loader = await this.loadingCtrl.create({
        message: 'Please wait...',
      });
      loader.present();
      let data = {
        npm: this.username,
        password: this.password,
      };
      const header = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Accept: 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      };
      try {
        const storage = await this.storage.create();
         fetch('https://edmrbimbingan.gebyar-it.xyz/elearning_native//login.php', {
          // fetch('http://localhost/elearning_native//login.php', {
          method: 'POST',
          headers: header,
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then(async (res) => {
            console.log(res)
            if (res.error === false) {
              loader.dismiss();
              await this.storage.set('isLoggedIn', res.result);
              // localStorage.setItem('isLoggedIn', res.result);
              this.navCtrl.navigateRoot(['/tabs/tab1']);
            } else {
              loader.dismiss();
              this.presentToast(res.message);
            }
          })
          .catch((error) => {
            this.presentToast(error);
          });
      } catch (err) {
        loader.dismiss();
        this.presentToast('Something went wrong!');
      }
    }
  }
  // register() {
  //   this.navCtrl.navigateForward('/register');
  // }
}
