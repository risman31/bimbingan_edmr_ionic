import { Component} from '@angular/core';
import { ModalController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {
  public informasiData:any = [];

  public kd_informasi:any = "";
  public fakultas_info:any = "";
  public prodi_info:any = "";
  public dentry:any = "";

  constructor(
    public modalCtrl: ModalController,
  ) {
    this.getData();
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
      // const res = await axios.get('https://edmrbimbingan.gebyar-it.xyz/elearning_native/get_bimbingan_informasi.php');
      // const res = await axios.get('http://localhost/elearning_native/get_bimbingan_informasi.php');
      const res = await axios.get('https://gebyar-it.xyz/api_native/api/get_bimbingan_informasi.php');
      this.informasiData = res.data.result;
      console.log(this.informasiData);
    }catch(err){
      console.log(err);
    }
  }


}

// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-tab4',
//   templateUrl: './tab4.page.html',
//   styleUrls: ['./tab4.page.scss'],
// })
// export class Tab4Page implements OnInit {
//   informasiData: any;
//   constructor() { }
//     handleRefresh(event) {
//     setTimeout(() => {
//       this.ngOnInit();
//       // Any calls to load data go here
//       event.target.complete();
//     }, 2000);
//   };
//   ngOnInit() {
//     const header = {
//       'Content-Type': 'applicatiom/json',
//       Accept: 'application/json'
//     }
//     const url = 'https://gebyar-it.xyz/api_native/api/get_bimbingan_informasi.php';
//     fetch(url, {
//       method: 'GET',
//       headers: header
//     }).then(res => res.json()).then(val => {
//       this.informasiData = val.result;

//     })
//   }

// }
