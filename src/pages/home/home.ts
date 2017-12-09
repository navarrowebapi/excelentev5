import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ModalController, ViewController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import 'moment/locale/pt-br';

// import { storage, initializeApp } from 'firebase';
// import { FIREBASE_CONFIG } from '../../app/firebase.config';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    myDate: String = new Date().toISOString();
    tomorow11;

    constructor(public navCtrl: NavController, public platform: Platform, public alertCtrl: AlertController, public modalCtrl: ModalController,
        public localNotifications: LocalNotifications) {

        this.platform.ready().then((rdy) => {
            this.localNotifications.on('click', (notification, state) => {
                let json = JSON.parse(notification.data);
                let groupModal = this.modalCtrl.create('ModalPage', { data: '' }, { showBackdrop: true, enableBackdropDismiss: false });
                groupModal.present();
            })
        });

    }

    NotificacaoInicioAlmoco2() {
        this.localNotifications.schedule({
            id: 1,
            title: "Olá!!!",
            text: "Horário do seu almoço",
            at: new Date(new Date().getTime() + 5 * 1000),
            // at:moment().hours(19).minutes(5).seconds(0),
            led: "FFFFFF",
            //every: "day",
            // sound: 'file://audio/sound.mp3',
            sound: 'res://platform_default',
            ongoing: true
        });
    }

    NotificacaoInicioAlmoco3() {
        this.localNotifications.schedule({
            id: 3,
            title: "Olá",
            text: "Horário do seu almoço",
            at:moment().hours(19).minutes(5).seconds(0),
            led: "FF0000",
            every: "day",
            ongoing: false,
            data: { mydata: "Retorno do click do almoço" }

        });
    }

    NotificacaoFinalAlmoco() {
        this.localNotifications.schedule({
            id: 4,
            title: "Olá",
            text: "Final de almoço, início de expediente, bom trabalho!",
            at: moment().hours(13).minutes(0).seconds(0),
            led: "FF0000",
            every: "day",
            ongoing: false,
            data: { mydata: "Retorno do click do almoço" }

        });
    }

    TESTE() {

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

