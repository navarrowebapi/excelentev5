import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LocalNotifications } from '@ionic-native/local-notifications';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public localNotifications: LocalNotifications) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();      
      
      this.localNotifications.schedule({
        id: 1,
        title: "Olá",
        text: "Horário do seu almoço",
        at: new Date("2017-11-30T11:00:00"),
        led: "FF0000",
        every: "day",
        sound: 'res://platform_default',
        ongoing: true
    });

    this.localNotifications.schedule({
      id: 2,
      title: "Olá, não se esqueça!",
      text: "Horário do seu almoço, segundo aviso",
      at: new Date("2017-11-30T11:30:00"),
      led: "FF0000",
      every: "day",
      sound: 'res://platform_default',
      ongoing: true

  });


    });
  }
}

