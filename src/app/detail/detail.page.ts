import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage {
  public captureData:any = [];

  public kd_capture:any = "";
  public kd_bimbingan:any = "";
  public keterangan:any = "";
  public photo:any = "";
  public dentry:any = "";
  public thn_akademik:any = "";

  foto:any;
  captureId:any;

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
  ) {
    this.captureId = this.navParams.get('id');
    console.log(this.captureId);
    this.getData();
  }

  async imageUpload(event) {
    console.log(event);
    const file = event.target.files[0];
    this.photo = file;
  }

  async dismiss(){
    await this.modalCtrl.dismiss();
  }

  async getData() {
    const fd = new FormData();
    fd.append('id', this.captureId);
    try{
      const res = await axios.post('https://edmrbimbingan.gebyar-it.xyz/elearning_native/get_bimbingan_captureId.php', fd);
      // const res = await axios.post('http://localhost/elearning_native/get_bimbingan_captureId.php', fd);
      this.captureData = res.data.result;
      for(let data of this.captureData){
        this.kd_capture = data.kd_capture;
        this.kd_bimbingan = data.kd_bimbingan;
        this.keterangan = data.keterangan;
        this.photo = data.photo;
        this.dentry = data.dentry;
        this.thn_akademik = data.thn_akademik;
      }
      console.log(this.captureData);
    }catch(err){
      console.log(err);
    }
  }

  backData() {
    this.dismiss();
    this.navCtrl.navigateRoot('/tabs/tab3');
  }

  // async updateData() {
  //   const fd = new FormData();
  //   fd.append('id', this.mahasiswaId);
  //   fd.append('npm', this.npm);
  //   fd.append('nama_mahasiswa', this.nama_mahasiswa);
  //   fd.append('jenis_kelamin', this.jenis_kelamin);
  //   fd.append('jurusan', this.jurusan);
  //   if(this.foto != undefined){
  //     fd.append('foto_siswa', this.foto);
  //   }else{
  //     fd.append('foto_siswa', this.foto_siswa);
  //   }
  //   try{
  //     const res = await axios.post('http://localhost/elearning_native/update_data_mahasiswa.php', fd);
  //     if(res.data.error == false){
  //       alert('Berhasil Mengupdate Data');
  //       this.dismiss();
  //       this.navCtrl.navigateRoot('/tabs/tab1');
  //     }else{
  //       alert('Gagal Mengupdate Data');
  //     }
  //     this.getData();
  //   }catch(err){
  //     console.log(err);
  //   }
  // }

}
