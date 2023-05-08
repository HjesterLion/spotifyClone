import { iMusica } from "./iMusica";

export interface iArtista{
    id:string,
    nome:string,
    imgUrl: string,
    musicas?: iMusica[],
    
}