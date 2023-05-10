import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iArtista } from 'src/app/interfaces/iArtista';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyServicesService } from 'src/app/services/spotify-services.service';

@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.scss']
})
export class ArtistasComponent implements OnInit{
  artistas:iArtista[] = []


  constructor(private spotifyService:SpotifyServicesService,private router:Router){}

  ngOnInit(): void {
    this.pegarArtistasRelacionados()
    
  }

  async pegarArtistasRelacionados(){
    const artistasRelacionados = await this.spotifyService.buscarArtistasRelacionado()
    this.artistas = artistasRelacionados

  }

  async irParaArtista(artistaId: string){
    this.router.navigateByUrl(`player/lista/artista/${artistaId}`)

  }

}
