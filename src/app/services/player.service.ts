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
    musica.play = (await this.spotifyService.obterStatusMusica()).is_playing
    this.definirMusicaAtual(musica)

    
    this.timerId = setInterval(async() =>{
      await this.obterMusicaAtual()

    },1000)

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
  async play(){
    await this.spotifyService.play()

  }
  async pause(){
    await this.spotifyService.pause()
  }
  async obterStatusMusica(){
    const status = this.spotifyService.obterStatusMusica()
    return status
  }
}
