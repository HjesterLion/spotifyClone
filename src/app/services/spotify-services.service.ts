import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment.development';
import Spotify from 'spotify-web-api-js'
import { iUsuario } from '../interfaces/iUsuarios';
import { SpotifyArtistaParaArtista, SpotifyPLaylistParaPlaylist, SpotifyPesquisa, SpotifySinglePlaylistParaPlaylist, SpotifyTrackParaMusica, SpotifyUserParaUsuario } from '../common/spotifyHelper';
import { iPlaylist } from '../interfaces/iPlaylist';
import { Router } from '@angular/router';
import { iArtista } from '../interfaces/iArtista';
import { iMusica } from '../interfaces/iMusica';
import { iPesquisa } from '../interfaces/iPesquisa';


@Injectable({
  providedIn: 'root'
})
export class SpotifyServicesService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;
  usuario:iUsuario ;
  pesquisa:iPesquisa 
  menuSelecionado:string = 'Home';

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

  async buscasRecentes(){
    const artista = await this.buscarTopArtistas(1)
    const result = await this.spotifyApi.getArtistRelatedArtists(artista.pop().id,)
    return result.artists.map(e => e.name)
  }

  async buscarArtistasRelacionado(){
    const topArtista = await this.buscarTopArtistas(1)
    const result = await this.spotifyApi.getArtistRelatedArtists(topArtista.pop().id)
    return result.artists.map(SpotifyArtistaParaArtista)
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

  async buscar(busca:string){
    const resultadoBusca = await this.spotifyApi.search(busca,["artist","playlist","track"])
    this.pesquisa = SpotifyPesquisa(resultadoBusca)
    return resultadoBusca

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
    const resultado = SpotifyTrackParaMusica(musica.item)
    resultado.progresso = musica.progress_ms
    
    return  resultado
  }

  async voltarMusica(){
    await this.spotifyApi.skipToPrevious()
  }

  async proximaMusica(){
    await this.spotifyApi.skipToNext()
  }

  async play(){
    await this.spotifyApi.play()
  }
  async pause(){
    await this.spotifyApi.pause()
  }

  async buscarMusicasPlaylist(playlistId:string,offset:number = 0, limit:number = 50){
    const playlistSpotify = await this.spotifyApi.getPlaylist(playlistId)

    if(!playlistSpotify){
      return null
    }

    const playlist = SpotifySinglePlaylistParaPlaylist(playlistSpotify)

    const musicasSpotify = await this.spotifyApi.getPlaylistTracks(playlistId,{offset,limit})
    playlist.musicas = musicasSpotify.items.map(e => SpotifyTrackParaMusica(e.track as SpotifyApi.TrackObjectFull))

    return playlist   
  }

  async buscarMusicasArtista(artistaId:string, offset:number=0,limit:number = 50){
    const artistaSpotify = await this.spotifyApi.getArtist(artistaId)

    const musicasArtistaSpotify = await this.spotifyApi.getArtistTopTracks(artistaId,'BR')

    const artista = SpotifyArtistaParaArtista(artistaSpotify)
    artista.musicas = musicasArtistaSpotify.tracks.map(e => SpotifyTrackParaMusica(e))

    return artista
  }

  async obterStatusMusica(){
    const statusMusica = await this.spotifyApi.getMyCurrentPlaybackState()
    return statusMusica

  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
