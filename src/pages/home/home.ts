import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ModalController, ViewController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    myDate: String = new Date().toISOString();

    constructor(public navCtrl: NavController, public platform: Platform, public alertCtrl: AlertController, public modalCtrl: ModalController,
        public localNotifications: LocalNotifications) {


        this.platform.ready().then((rdy) => {
            this.localNotifications.on('click', (notification, state) => {
                let json = JSON.parse(notification.data);

                let groupModal = this.modalCtrl.create('ModalPage', { data: 'TESTE123'}, {showBackdrop: true, enableBackdropDismiss: false});
                groupModal.present();
                groupModal.onDidDismiss(data => {
                    let alert = this.alertCtrl.create({
                        title: 'on dismiss ' + data,
                        buttons: ['Ok']
                      });
                  
                      alert.present();
                });

            })
        });

    }

    marcarNotificacao() {
        this.localNotifications.schedule({
            id: 1,
            title: "ATENTE-SE",
            text: "AVISO DE INTERVALO",
            at: new Date(new Date().getTime() + 5 * 1000),
            led: "FF0000",
            // every: "minute",
            ongoing: false,
            data: { mydata: "Retorno do click do almoço" }

        });
    }

    // ionViewDidLoad() {

    // }

    TESTE(){
        
        let alert = this.alertCtrl.create({
            title: 'Data Teste ' + this.myDate,
            buttons: ['Ok']
        });

        alert.present();


    }

    cancelAll() {

        this.localNotifications.cancelAll();

        let alert = this.alertCtrl.create({
            title: 'Notificações canceladas',
            buttons: ['Ok']
        });

        alert.present();

    }
}

