import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SpotifyServicesService } from 'src/app/services/spotify-services.service';

@Component({
  selector: 'app-buscas-recentes',
  templateUrl: './buscas-recentes.component.html',
  styleUrls: ['./buscas-recentes.component.scss']
})
export class BuscasRecentesComponent implements OnInit {
  pesquisasRecentes = ['']
  campoPesquisa = ''
  
  pesquisaIcon = faSearch

  @Output() buscaEvent = new EventEmitter()
  
  constructor(private spotifyService:SpotifyServicesService,private router:Router){}
  ngOnInit(): void {
    this.tocadosRecente()
  }
  definirPesquisa(pesquisa:string){
    this.campoPesquisa = pesquisa
  }
  async buscar(){
    if(this.campoPesquisa != ''){
      const result = await this.spotifyService.buscar(this.campoPesquisa)
      if(!!result){
        this.campoPesquisa = ''
        this.router.navigateByUrl('player/pesquisar')
        this.buscaEvent.emit()
      }

    }
  }

  async tocadosRecente(){
    const relacionadoTopArtista = await this.spotifyService.buscasRecentes()
    this.pesquisasRecentes = relacionadoTopArtista.slice(0,5)

  }


  
}
