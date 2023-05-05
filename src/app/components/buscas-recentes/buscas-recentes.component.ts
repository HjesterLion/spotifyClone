import { Component } from '@angular/core';

@Component({
  selector: 'app-buscas-recentes',
  templateUrl: './buscas-recentes.component.html',
  styleUrls: ['./buscas-recentes.component.scss']
})
export class BuscasRecentesComponent {
  pesquisasRecentes = [
    'Top Brasil','Top Global', 'Esquenta Sertaneja', 'Kpop hits','Eletronicas'
  ]
  campoPesquisa = ''

  definirPesquisa(pesquisa:string){
    this.campoPesquisa = pesquisa
  }
  buscar(){
    console.log('buscando',this.campoPesquisa)
  }

}
