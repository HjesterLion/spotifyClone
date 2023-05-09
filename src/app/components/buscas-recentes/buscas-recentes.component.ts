import { Component, OnInit } from '@angular/core';
import { SpotifyServicesService } from 'src/app/services/spotify-services.service';

@Component({
  selector: 'app-buscas-recentes',
  templateUrl: './buscas-recentes.component.html',
  styleUrls: ['./buscas-recentes.component.scss']
})
export class BuscasRecentesComponent implements OnInit {
  pesquisasRecentes = ['']
  campoPesquisa = ''
  
  ngOnInit(): void {
    this.tocadosRecente()
  }
  definirPesquisa(pesquisa:string){
    this.campoPesquisa = pesquisa
  }
  buscar(){
    this.spotifyService.buscar(this.campoPesquisa)
  }

  async tocadosRecente(){
    const relacionadoTopArtista = await this.spotifyService.buscasRecentes()
    this.pesquisasRecentes = relacionadoTopArtista.slice(0,5)

  }

  constructor(private spotifyService:SpotifyServicesService){}

  
}
