import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPause, faPlay, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/common/factories';
import { iMusica } from 'src/app/interfaces/iMusica';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  musica: iMusica = newMusica()
  subs: Subscription[] = []

  anteriorIcone = faStepBackward
  proximoIcone = faStepForward
  playIcone = faPlay
  artista: any = []

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.obterMusicaTocando()
  }
  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  async obterMusicaTocando() {
    const sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musica = musica
      this.artista = musica.artitas.map(e => { return e.nome })
      if (this.musica && this.musica.play) {
        this.playIcone = faPause
      } else {
        this.playIcone = faPlay
      }
    })
    this.subs.push(sub)

  }

  voltarMusica() {
    this.playerService.voltarMusica()
    // this.playIcone = faPause

  }
  proximaMusica() {
    this.playerService.proximaMusica()
    // this.playIcone = faPause

  }
  playPause() {
    if (this.musica.id == '') {
      return
    }
    if (this.playIcone == faPlay) {
      this.playerService.play()
      // this.playIcone = faPause

    } else {
      this.playerService.pause()
      // this.playIcone = faPlay

    }
  }
  progresso() {
      const progressoPorcentagem = (this.musica.progresso*100)/this.musica.progressoTotal
      return progressoPorcentagem


  }
}
