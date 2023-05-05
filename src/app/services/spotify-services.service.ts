import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment.development';
import Spotify from 'spotify-web-api-js'
import { iUsuario } from '../interfaces/iUsuarios';
import { SpotifyArtistaParaArtista, SpotifyPLaylistParaPlaylist, SpotifyTrackParaMusica, SpotifyUserParaUsuario } from '../common/spotifyHelper';
import { iPlaylist } from '../interfaces/iPlaylist';
import { Router } from '@angular/router';
import { iArtista } from '../interfaces/iArtista';
import { iMusica } from '../interfaces/iMusica';


@Injectable({
  providedIn: 'root'
})
export class SpotifyServicesService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;
  usuario:iUsuario ;



  constructor(
    private router: Router
  ) {  
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

  async buscarPlaylistUsuario(offset = 0, limit = 50): Promise<iPlaylist[]>{
    const playlists = await this.spotifyApi.getUserPlaylists(this.usuario.id,{offset,limit});
    return playlists.items.map(SpotifyPLaylistParaPlaylist)
  }

  async buscarTopArtistas( limit = 10):Promise <iArtista[]>{
    const artistas = await this.spotifyApi.getMyTopArtists({limit})
    return artistas.items.map(SpotifyArtistaParaArtista)

  }
  async buscarArtista(id = '6YVMFz59CuY7ngCxTxjpxE'){
    const artista = await this.spotifyApi.getArtist(id)
    return artista
    
  }

  async buscarMusicas(offset = 0, limit= 50):Promise<iMusica[]>{
    const musicas = await this.spotifyApi.getMySavedTracks({offset,limit})
    return musicas.items.map(e => SpotifyTrackParaMusica(e.track))
  }

  async excecutarMusica(musicaId: string){
    await this.spotifyApi.queue(musicaId)
    await this.spotifyApi.skipToNext()

  }

  async obeterMusicaAtual():Promise<iMusica>{
    const musica = await this.spotifyApi.getMyCurrentPlayingTrack()
    return SpotifyTrackParaMusica(musica.item)
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
