import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { NativeStorage } from '@ionic-native/native-storage';
import { File } from '@ionic-native/file';

import * as moment from 'moment';
import 'moment/locale/pt-br';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  cpf: string = '';
  dirPath;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public nativeStorage: NativeStorage, private file: File) {
  }


  getCPF() {
    let result = this.file.createDir(this.file.externalRootDirectory, "EXCELENTE", true);
    result.then(data => {
      this.dirPath = data.toURL();


      let now = moment().format();
      this.file.writeFile(this.dirPath, this.cpf, this.cpf +"@"+ now , { replace: true });


    }).catch(err => {
      let alertaErro = this.alertCtrl.create({ title: "Erro: " + err });
      alertaErro.present();
    });

    //Persistir CPF e data em que foi enviado.
    this.nativeStorage.setItem('cpf', { property: this.cpf })
      .then(
      () => console.log('Stored item!'),
      error => console.error('Error storing item', error)
      );
    //Mostrar ao usuário
    let alert = this.alertCtrl.create({
      title: 'CPF ' + this.cpf + ' registrado com sucesso ',
      message: "Registrar mais um CPF?",
      buttons: [
        {
          text: 'NÃO',
          role:'Cancel',
          handler: () => {
            this.navCtrl.push(HomePage);
          }},
          {
            text: 'SIM',
            handler: () => {
              this.navCtrl.push(ModalPage);
            }
          }
      ]
    });
    alert.present();
  }

}
