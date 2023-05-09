import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/common/factories';
import { iMusica } from 'src/app/interfaces/iMusica';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyServicesService } from 'src/app/services/spotify-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {
  musicas:iMusica[] = []
  musicaAtual: iMusica = newMusica()
  subs:Subscription[] =[]

  playIcone = faPlay
  constructor(
    private spotifyService: SpotifyServicesService,
    private playerService: PlayerService
  ){}

  ngOnInit(): void {
    this.obterMusicaAtual()
    this.obterMusicas()
    
  }
  ngOnDestroy(): void {
    this.subs.forEach(e => e.unsubscribe())
  }

  async obterMusicas(){
    this.musicas =  await this.spotifyService.buscarMusicas()
  }
  obterMusicaAtual(){
    const sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica
    })
    this.subs.push(sub)

  }

  obterArtistas(musicas: iMusica){
    return musicas.artitas.map(e => e.nome).join(', ')
  }

  async executarMusica(musica:iMusica){
    await this.spotifyService.excecutarMusica(musica.id)
    this.playerService.definirMusicaAtual(musica)

  }
}
