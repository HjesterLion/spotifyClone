import { Component, OnInit } from '@angular/core';
import { SpotifyServicesService } from 'src/app/services/spotify-services.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  constructor(private spotifyService: SpotifyServicesService) { }

  ngOnInit(): void {
    this.menuSelecionado()

  }
  menuSelecionado() {
    const endPoint = window.location.href.split('/').pop()
    if (endPoint == 'home') {
      this.spotifyService.menuSelecionado = 'Home'
      return
    }
    if (endPoint == 'pesquisar') {
      this.spotifyService.menuSelecionado = 'Pesquisar'
      return
    }
    if (endPoint == 'artistas') {
      this.spotifyService.menuSelecionado = 'Artistas'
      return
    }
    this.spotifyService.menuSelecionado = endPoint

  }

}
