import { Component, OnInit } from '@angular/core';
import { faSignOut, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { iUsuario } from 'src/app/interfaces/iUsuarios';
import { SpotifyServicesService } from 'src/app/services/spotify-services.service';

@Component({
  selector: 'app-rodape-usuario',
  templateUrl: './rodape-usuario.component.html',
  styleUrls: ['./rodape-usuario.component.scss']
})
export class RodapeUsuarioComponent implements OnInit{

  sairIcone = faSignOutAlt
  usuario: iUsuario = null

  constructor(
    private spotifyService: SpotifyServicesService
  ){}

  ngOnInit(): void {
    this.usuario = this.spotifyService.usuario
    
  }
  logout(){
    this.spotifyService.logout()
  }

}
