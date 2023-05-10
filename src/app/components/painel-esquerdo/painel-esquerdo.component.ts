import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Subscribable, Subscription } from 'rxjs';
import { iPlaylist } from 'src/app/interfaces/iPlaylist';
import { SpotifyServicesService } from 'src/app/services/spotify-services.service';

@Component({
  selector: 'app-painel-esquerdo',
  templateUrl: './painel-esquerdo.component.html',
  styleUrls: ['./painel-esquerdo.component.scss']
})
export class PainelEsquerdoComponent implements OnInit, OnDestroy{
  playlists:iPlaylist[] = []
  subs:Subscription[]= []

  homeIcone = faHome;
  pesquisarIcone = faSearch;
  artistaIcon = faGuitar
  playlistIcone = faMusic
  
  constructor(
    private router: Router,
    private spotifyService: SpotifyServicesService,
    private activeRoute: ActivatedRoute
  ){}

  ngOnInit(): void{
    this.buscarPlaylist()

  }
  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
    
  }
  botaoClick(botao:string){
    this.spotifyService.menuSelecionado = botao
    this.router.navigateByUrl(`player/${botao.toLocaleLowerCase()}`)
  }

  async buscarPlaylist(){
    this.playlists = await this.spotifyService.buscarPlaylistUsuario()

  }

  irParaPlaylist(playlistId:string){
    this.spotifyService.menuSelecionado = playlistId;
    this.router.navigateByUrl(`player/lista/playlist/${playlistId}`)
  }
  verificaMenu(playlistId:string){
    return this.spotifyService.menuSelecionado == playlistId
  }

}
