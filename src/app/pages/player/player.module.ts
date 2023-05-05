import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { RouterModule } from '@angular/router';
import { PlayerRoutas } from './player.routes';
import { PainelEsquerdoComponent } from 'src/app/components/painel-esquerdo/painel-esquerdo.component';
import { BotaoMenuComponent } from 'src/app/components/botao-menu/botao-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RodapeUsuarioComponent } from 'src/app/components/rodape-usuario/rodape-usuario.component';
import { HomeComponent } from '../home/home.component';
import { TopArtistaComponent } from 'src/app/components/top-artista/top-artista.component';
import { PainelDireitoComponent } from 'src/app/components/painel-direito/painel-direito.component';
import { BuscasRecentesComponent } from 'src/app/components/buscas-recentes/buscas-recentes.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PlayerComponent,
    PainelEsquerdoComponent,
    BotaoMenuComponent,
    RodapeUsuarioComponent,
    HomeComponent,
    TopArtistaComponent,
    PainelDireitoComponent,
    BuscasRecentesComponent,
  ],
  imports: [
    FormsModule,
    FontAwesomeModule,
    CommonModule,
    RouterModule.forChild(PlayerRoutas)
  ]
})
export class PlayerModule { }
