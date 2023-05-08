import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/common/factories';
import { iMusica } from 'src/app/interfaces/iMusica';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyServicesService } from 'src/app/services/spotify-services.service';

@Component({
  selector: 'app-lista-musicas',
  templateUrl: './lista-musicas.component.html',
  styleUrls: ['./lista-musicas.component.scss']
})
export class ListaMusicasComponent implements OnInit,OnDestroy{

  bannerImagemUrl = ''
  bannerTexto = ''
  titulo = ''

  musicas: iMusica[] = []
  musicaAtual: iMusica = newMusica()

  playIcone = faPlay

  subs:Subscription[]= []

  constructor(private activedRoute: ActivatedRoute,private spotifyService:SpotifyServicesService ,private playerService: PlayerService){}


  ngOnInit(): void {
    this.obterMusica()
    this.obterMusicaAtual()
    
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  obterMusica(){
    const sub = this.activedRoute.paramMap.subscribe( async params =>{
      const tipo =  params.get('tipo')
      const id = params.get('id')
      await this.obterDadosPagina(tipo,id)
    })

    this.subs.push(sub)

  }

  async obterDadosPagina(tipo:string,id:string){
    if(tipo == 'playlist'){
      await this.obterDadosPlaylist(id)
    }else{
      await this.obterDadosArtista(id)
    }

  }

  async obterDadosPlaylist(playlistId:string){
    const playlistMusicas = await this.spotifyService.buscarMusicasPlaylist(playlistId)
    this.definirDadosPagina(playlistMusicas.nome,playlistMusicas.imagUrl,playlistMusicas.musicas)
    this.titulo = 'Musicas Playlist: ' + playlistMusicas.nome

  }

  async obterDadosArtista(artistaId:string){

  }
  async executarMusica(musica:iMusica){
    await this.spotifyService.excecutarMusica(musica.id)
    this.playerService.definirMusicaAtual(musica)

  }

  obterMusicaAtual(){
    const sub =  this.playerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica
    })
    this.subs.push(sub)
  }

  obterArtistas(musicas: iMusica){
    return musicas.artitas.map(e => e.nome).join(', ')
  }

  definirDadosPagina(bannerTexto:string,bannerImage: string, musicas:iMusica[]){
    this.bannerImagemUrl = bannerImage
    this.bannerTexto = bannerTexto
    this.musicas = musicas
  }
}
