import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iPesquisa } from 'src/app/interfaces/iPesquisa';
import { SpotifyServicesService } from 'src/app/services/spotify-services.service';
import { newMusica } from 'src/app/common/factories';
import { iMusica } from 'src/app/interfaces/iMusica';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from 'src/app/services/player.service';


@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.scss']
})
export class PesquisaComponent implements OnInit {

  playIcone = faPlay

  musicaAtual: iMusica = newMusica()


  pesquisa: iPesquisa
  
  constructor(private spotifyService: SpotifyServicesService,private router:Router,private playerService: PlayerService) { }
    
  ngOnInit(): void {
    this.buscarPesquisa()

  }

  async buscarPesquisa() {
      this.pesquisa = this.spotifyService.pesquisa

  }

  async irParaArtista(artistaId: string){
    this.router.navigateByUrl(`player/lista/artista/${artistaId}`)

  }

  irParaPlaylist(playlistId:string){
    this.router.navigateByUrl(`player/lista/playlist/${playlistId}`)
  }

  obterArtistas(musicas: iMusica){
    return musicas.artitas.map(e => e.nome).join(', ')
  }

  async executarMusica(musica:iMusica){
    await this.spotifyService.excecutarMusica(musica.id)
    this.playerService.definirMusicaAtual(musica)

  }
  receberDados(dados:string){
    console.log(dados)
  }

}
