import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyServicesService } from 'src/app/services/spotify-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private spotifyServices: SpotifyServicesService,
    private router: Router
    ){}

  ngOnInit():void{
    this.verificarTokenUrlCallback()

  }
  verificarTokenUrlCallback(){
    const token = this.spotifyServices.obterTokenUrlcallback()
    if(!!token){
      this.spotifyServices.definirAccessToken(token)
      this.router.navigate(['/player/home'])

    }
  }


  clicarBotao(){
    window.location.href = this.spotifyServices.getUrlLogin()
    
  }

}
