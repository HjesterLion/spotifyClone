import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iArtista } from 'src/app/interfaces/iArtista';
import { SpotifyServicesService } from 'src/app/services/spotify-services.service';

@Component({
  selector: 'app-top-artistas',
  templateUrl: './top-artistas.component.html',
  styleUrls: ['./top-artistas.component.scss']
})
export class TopArtistasComponent implements OnInit {

  artistas: iArtista[]= []
  menuSelecionado = 'Home'

  constructor(private spotifyService:SpotifyServicesService,private router: Router){}

  ngOnInit(): void {
    this.buscarTopArtistas()
    
  }

  async buscarTopArtistas(){
    this.artistas = await this.spotifyService.buscarTopArtistas(5)

  }
  async irParaArtista(artistaId: string){
    this.menuSelecionado = artistaId
    this.router.navigateByUrl(`player/lista/artista/${artistaId}`)

  }

}
