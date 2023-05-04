import { Component, OnInit } from '@angular/core';
import { faGuitar, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-painel-esquerdo',
  templateUrl: './painel-esquerdo.component.html',
  styleUrls: ['./painel-esquerdo.component.scss']
})
export class PainelEsquerdoComponent implements OnInit{

  homeIcone = faHome;
  pesquisarIcone = faSearch;
  artistaIcon = faGuitar
  constructor(){}

  ngOnInit(): void{

  }

}
