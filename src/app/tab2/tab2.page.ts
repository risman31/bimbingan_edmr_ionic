import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import axios from 'axios';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  public bimbinganData:any = [] ;
  active: any;
  public kd_bimbingan:any = "";
  public thn_akademik:any = "";
  public judul:any = "";
  public topik:any = "";
  public nama_dosen:any = "";

  public dentry:any = "";
  public keterangan:any = "";
  public photo:any ="";

  constructor(
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private storage: Storage
  ) {
    this.getData();
    // this.addData();
  }

  handleRefresh(event) {
    setTimeout(() => {
      this.getData();
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  };

  async getData() {
    try{
      this.storage.get('isLoggedIn').then( async val => {
        const data = {
          npm: val.npm
        }
        const data1 = {
          nama: val.nama
        }
        const header = {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Accept: 'application/json',
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'application/json',
        };
        fetch('https://edmrbimbingan.gebyar-it.xyz/elearning_native/login2.php', {
          // fetch('http://localhost/elearning_native/login2.php', {
          method: 'POST',
          headers: header,
          body: JSON.stringify(data1),
        })
          .then((res) => res.json())
          .then((res) => {
          
            this.active = res.result.aktif
            console.log(this.active)
          })
          // fetch('http://localhost/elearning_native/get_bimbingan_data.php', {
        fetch('https://edmrbimbingan.gebyar-it.xyz/elearning_native/get_bimbingan_data.php', {
          method: 'POST',
          headers: header,
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            this.bimbinganData = res.result;
          })

        // this.bimbinganData = res.data.result;
        // console.log(this.bimbinganData);
      })
    }catch(err){
      console.log(err);
    }
  }

  async imageUpload(event) {
    console.log(event);
    const file = event.target.files[0];
    this.photo = file;
  }



  async addData() {
    const formData = new FormData();
    formData.append('kd_bimbingan', this.bimbinganData[0].kd_bimbingan);
    formData.append('dentry', this.dentry);
    formData.append('keterangan', this.keterangan);
    formData.append('photo', this.photo);
    formData.append('thn_akademik', this.bimbinganData[0].thn_akademik);
    console.log(FormData);

    try{
      const res = await axios.post('https://edmrbimbingan.gebyar-it.xyz/elearning_native/post_capture.php', formData);
      // const res = await axios.post('http://localhost/elearning_native/post_capture.php', formData);
      console.log(res.data);

      if(res.data.error == false){
        const toast = await this.toastCtrl.create({
          message: 'Data Behasil Ditambahkan',
          duration: 2000
        });
        toast.present();
        this.storage.create();
        this.storage.set('kd_bimbingan', this.bimbinganData[0].kd_bimbingan);
      }
    }catch(err){
      console.log(err);
    }
  }

}
