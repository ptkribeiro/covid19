import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { AlertController} from'@ionic/angular'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario:string;
  senha: string;

  constructor(
    public afAuth: AngularFireAuth,
    public route: Router,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }


  async login(){
    const {usuario, senha} = this
    try {
      const res = await this.afAuth.signInWithEmailAndPassword(usuario + '@teste.com', senha)
      console.log(res)
      this.showAlert("Sucesso!", "Seja bem vindo")
      this.route.navigate(['/tabs'])
    }catch(err){
      console.dir(err)
      if (err.code === "auth/user-not-found"){
        console.log("Usuário não encontrado")
      }
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
