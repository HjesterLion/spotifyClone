import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyServicesService } from 'src/app/services/spotify-services.service';

@Component({
  selector: 'app-buscas-recentes',
  templateUrl: './buscas-recentes.component.html',
  styleUrls: ['./buscas-recentes.component.scss']
})
export class BuscasRecentesComponent implements OnInit {
  pesquisasRecentes = ['']
  campoPesquisa = ''

  @Output() buscaEvent = new EventEmitter() 
  
  constructor(private spotifyService:SpotifyServicesService,private router:Router){}
  ngOnInit(): void {
    this.tocadosRecente()
  }
  definirPesquisa(pesquisa:string){
    this.campoPesquisa = pesquisa
  }
  buscar(){
    this.spotifyService.buscar(this.campoPesquisa)
    this.campoPesquisa = ''
    this.buscaEvent.emit()
    // this.router.navigateByUrl('player/pesquisar')
  }

  async tocadosRecente(){
    const relacionadoTopArtista = await this.spotifyService.buscasRecentes()
    this.pesquisasRecentes = relacionadoTopArtista.slice(0,5)

  }


  
}
