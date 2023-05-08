import { iMusica } from "./iMusica";

export interface iPlaylist{
    id:string,
    nome:string,
    imagUrl: string,
    musicas?: iMusica[],
}