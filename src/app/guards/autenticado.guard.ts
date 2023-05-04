import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyServicesService } from '../services/spotify-services.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticadoGuard implements CanLoad {
  constructor(
    private router:Router,
    private spotifyService:SpotifyServicesService
    ){}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = localStorage.getItem('token')
      if(!token){
        return this.naoAutenticado()
      }

      return new Promise(async (res) =>{
        const usuarioCriado = await this.spotifyService.inicializarServico()
        if(usuarioCriado){
          res(true)
        }else{
          res(this.naoAutenticado())
        }
      })
  }
  naoAutenticado(){
    localStorage.clear()
    this.router.navigate(['/login'])
    return false
  }
}
