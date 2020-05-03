import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  usuario: string;
  senha: string;
  csenha: string;


  constructor(public afAuth: AngularFireAuth,
    public alert: AlertController,
    public route: Router
    ) { }

  ngOnInit() {
  }

  async register(){
    const {usuario, senha, csenha} = this
    if(senha !== csenha){
      this.showAlert("Erro!", "Senhas não batem")
      return console.error("As senhas não batem")
    }
    try{
      const res = await this.afAuth.createUserWithEmailAndPassword(usuario + '@teste.com', senha)
      console.log(res)
      this.showAlert("Sucesso!", "Seja bem vindo")
      this.route.navigate(['/tabs'])
    }catch(error) {
      console.dir(error)
      this.showAlert("Error!", error.message)
    }
  }

  async showAlert(header: string, message: string){
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Ok"]
    })
    await alert.present()
  }

}
