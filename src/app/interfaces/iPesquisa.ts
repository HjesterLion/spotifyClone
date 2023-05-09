import { iArtista } from "./iArtista"
import { iMusica } from "./iMusica"
import { iPlaylist } from "./iPlaylist"

export interface iPesquisa {
    album:{
        id:string,
        nome:string,
        imgUrl:string
    }[],
    artista:iArtista[],

    playlists:iPlaylist[],

}