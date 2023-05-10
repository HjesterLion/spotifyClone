import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-painel-direito',
  templateUrl: './painel-direito.component.html',
  styleUrls: ['./painel-direito.component.scss']
})
export class PainelDireitoComponent {
  @Output() buscaEvent = new EventEmitter()

  emitirEventoFilho(){
    this.buscaEvent.emit()
  }



}
