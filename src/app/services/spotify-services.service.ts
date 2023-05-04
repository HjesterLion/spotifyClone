import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment.development';
import Spotify from 'spotify-web-api-js'
import { iUsuario } from '../interfaces/iUsuarios';
import { SpotifyUserParaUsuario } from '../common/spotifyHelper';


@Injectable({
  providedIn: 'root'
})
export class SpotifyServicesService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;
  usuario:iUsuario ;



  constructor() {  
    this.spotifyApi = new Spotify()
   }
  
  async inicializarServico(){
    if(!!this.usuario){return true}
    const token = localStorage.getItem('token')
    if(!token){
      return false
    }
    try{
      this.definirAccessToken(token);
      await this.obterSpotifyUsuario()
      return !!this.usuario

    }catch(err){
      return console.log(err)
    }
  }
  async obterSpotifyUsuario(){
    const userInfo = await this.spotifyApi.getMe()
    this.usuario = SpotifyUserParaUsuario(userInfo)
  }

  getUrlLogin(){
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  
  }

  obterTokenUrlcallback(){
    if(!window.location.hash){
      return ''
    }
    const params = window.location.hash.substring(1).split('&')
    return params[0].split('=')[1]
  }

  definirAccessToken(token:string){
    this.spotifyApi.setAccessToken(token)
    localStorage.setItem('token',token)
  }
}
