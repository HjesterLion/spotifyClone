import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { iPlaylist } from 'src/app/interfaces/iPlaylist';
import { SpotifyServicesService } from 'src/app/services/spotify-services.service';

@Component({
  selector: 'app-painel-esquerdo',
  templateUrl: './painel-esquerdo.component.html',
  styleUrls: ['./painel-esquerdo.component.scss']
})
export class PainelEsquerdoComponent implements OnInit{

  menuSelecionado = 'Home'

  playlists:iPlaylist[] = []

  homeIcone = faHome;
  pesquisarIcone = faSearch;
  artistaIcon = faGuitar
  playlistIcone = faMusic
  
  constructor(
    private router: Router,
    private spotifyService: SpotifyServicesService
  ){}

  ngOnInit(): void{
    this.buscarPlaylist()

  }
  botaoClick(botao:string){
    this.menuSelecionado = botao
    this.router.navigateByUrl('player/home')

  }

  async buscarPlaylist(){
    this.playlists = await this.spotifyService.buscarPlaylistUsuario()

  }

  irParaPlaylist(playlistId:string){
    this.menuSelecionado = playlistId;
    this.router.navigateByUrl(`player/lista/playlist/${playlistId}`)
  }

}
