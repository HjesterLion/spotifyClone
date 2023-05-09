import { Routes } from "@angular/router";
import { PlayerComponent } from "./player.component";
import { HomeComponent } from "../home/home.component";
import { ListaMusicasComponent } from "../lista-musicas/lista-musicas.component";
import { PesquisaComponent } from "../pesquisa/pesquisa.component";
import { ArtistasComponent } from "../artistas/artistas.component";

export const PlayerRoutas: Routes = [
    {
        path:'',
        component: PlayerComponent,
        children:[
            {
                path:'home',
                component:HomeComponent
            },
            {
                path:'lista/:tipo/:id',
                component:ListaMusicasComponent
            },
            {
                path:'pesquisar',
                component:PesquisaComponent,
            },
            {
                path:'artistas',
                component:ArtistasComponent
            }
        ]
    }
    
]