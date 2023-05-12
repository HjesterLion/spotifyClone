import { Component, OnInit } from '@angular/core';
import { newArtista } from 'src/app/common/factories';
import { iArtista } from 'src/app/interfaces/iArtista';
import { SpotifyServicesService } from 'src/app/services/spotify-services.service';

@Component({
  selector: 'app-top-artista',
  templateUrl: './top-artista.component.html',
  styleUrls: ['./top-artista.component.scss']
})
export class TopArtistaComponent implements OnInit {

  artista:iArtista = newArtista()

  constructor(
    private spotifyService:SpotifyServicesService
  ){}

  ngOnInit(): void {
    this.buscarArtista()

  }
  async buscarArtista(){
    const artistas = await this.spotifyService.buscarTopArtistas()
    if(!!artistas){
      this.artista = artistas.shift();
    }
  }
  
}
