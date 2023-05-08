import { Injectable } from '@angular/core';
import { iMusica } from '../interfaces/iMusica';
import { newMusica } from '../common/factories';
import { BehaviorSubject } from 'rxjs';
import { SpotifyServicesService } from './spotify-services.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  musicaAtual = new BehaviorSubject<iMusica>(newMusica());
  timerId:any = null

  constructor(private spotifyService: SpotifyServicesService) {
    this.obterMusicaAtual()
   }

  async obterMusicaAtual(){
    clearTimeout(this.timerId)
    const musica = await this.spotifyService.obeterMusicaAtual()
    this.definirMusicaAtual(musica)

    
    this.timerId = setInterval(async() =>{
      await this.obterMusicaAtual()

    },3000)

  }
  definirMusicaAtual(musica:iMusica){
    this.musicaAtual.next(musica)
  }

  async voltarMusica(){
    await this.spotifyService.voltarMusica()
  }

  async proximaMusica(){
    await this.spotifyService.proximaMusica()
  }
}
