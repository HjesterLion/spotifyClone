import { iArtista } from "./iArtista"
import { iMusica } from "./iMusica"
import { iPlaylist } from "./iPlaylist"

export interface iPesquisa {
    artista:iArtista[],

    playlists:iPlaylist[],

    musicas:iMusica[]

}