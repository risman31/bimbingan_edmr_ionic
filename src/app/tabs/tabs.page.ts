import { Component, OnInit  } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  public data: object;

  public header = new Headers({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Accept: 'application/json',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json',
  });
  constructor(private storage: Storage) {}
  ngOnInit(): void {
    this.storage.get('isLoggedIn').then((val) => {
      console.log(val)
      this.data = {
        npm: val.npm,
      };

      const url =
        'https://edmrbimbingan.gebyar-it.xyz/elearning_native/get_bimbingan_data.php';
        // 'http://localhost/elearning_native/get_bimbingan_data.php';
      fetch(url, {
        method: 'POST',
        headers: this.header,
        body: JSON.stringify(this.data),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.result);
          this.storage.set('kd_bimbingan', res.result[0].kd_bimbingan);
        });
    });
  }
}
