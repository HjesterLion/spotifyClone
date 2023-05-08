import { Component, OnInit } from '@angular/core';
import { iArtista } from 'src/app/interfaces/iArtista';
import { SpotifyServicesService } from 'src/app/services/spotify-services.service';

@Component({
  selector: 'app-top-artistas',
  templateUrl: './top-artistas.component.html',
  styleUrls: ['./top-artistas.component.scss']
})
export class TopArtistasComponent implements OnInit {

  artistas: iArtista[]= []

  constructor(private spotifyService:SpotifyServicesService){}

  ngOnInit(): void {
    this.buscarTopArtistas()
    
  }

  async buscarTopArtistas(){
    this.artistas = await this.spotifyService.buscarTopArtistas(5)

  }

}
