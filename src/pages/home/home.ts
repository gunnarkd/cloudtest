import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

import { Auth, User, AuthLoginOptions } from '@ionic/cloud-angular';

import {Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  signup = false;
  password: string;
  name: string;
  email: string;

  constructor(public navCtrl: NavController, public auth: Auth, public user: User) {

  }

  login(){
    console.log('login trykket på');
    //Her er dataene som sendes til deg
    let loginData = {'email': this.email, 'password': this.password, 'login':true};
    //om du setter 'hidden':false her, vil du få se på feilmeldiner fra serveren
    let loginOptions: AuthLoginOptions = {'inAppBrowserOptions': {'hidden': true}};


    Observable.fromPromise(this.auth.login('custom', loginData, loginOptions))
    .timeout(10000)//vi får ikke noe svar fra promises om det feiler, så vi bruker en timeout for å vite at det har feilet
    .toPromise()
    .then(()=>{
      //Når promises lykkes blir this.user oppdatert med dataene fra innloggingen
      alert('Login suksess:\n\n'+JSON.stringify(this.user.details)+'\n\n'+JSON.stringify(this.user.data));

      console.log('Login ok');
      console.log('Her ligger external_id: '+JSON.stringify(this.user.details));
      console.log('Her ligger custom dataene: '+JSON.stringify(this.user.data));
    })
    .catch((err)=>{
      alert('Login timed out');
      console.log('Login timed out');
    })

  }
  register(){
    let registerData = {'email': this.email, 'password': this.password, 'name':this.name,'register':true};
    let registerOptions: AuthLoginOptions = {'inAppBrowserOptions': {'hidden': true}};

    Observable.fromPromise(this.auth.login('custom', registerData, registerOptions))
    .timeout(10000)
    .toPromise()
    .then((data)=>{

      alert('Register suksess:\n\n'+JSON.stringify(this.user.details)+'\n\n'+JSON.stringify(this.user.data));

      console.log('Register ok');
      console.log('Her ligger external_id: '+JSON.stringify(this.user.details));
      console.log('Her ligger custom dataene: '+JSON.stringify(this.user.data));
    })
    .catch((err)=>{
      alert('Register timed out');
      console.log('Register timed out');
    })
  }

  public toggleRegister(){
    this.signup=!this.signup;
  }

}
