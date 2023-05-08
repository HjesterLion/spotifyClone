import { iArtista } from "../interfaces/iArtista";
import { iMusica } from "../interfaces/iMusica";
import { iPlaylist } from "../interfaces/iPlaylist";
import { iUsuario } from "../interfaces/iUsuarios";
import { newMusica } from "./factories";

export function SpotifyUserParaUsuario(user: SpotifyApi.CurrentUsersProfileResponse): iUsuario {
    return {
        id: user.id,
        nome: user.display_name,
        imgUrl: user.images.pop()?.url
    }
}
export function SpotifySinglePlaylistParaPlaylist(playlist:SpotifyApi.SinglePlaylistResponse):iPlaylist{
    return{
        id:playlist.id,
        nome:playlist.name,
        imagUrl: playlist.images.shift()?.url,
        musicas:[]
    }

}

export function SpotifyPLaylistParaPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): iPlaylist {
    return {
        id: playlist.id,
        nome: playlist.name,
        imagUrl: playlist.images.pop()?.url
    }
}
export function SpotifyArtistaParaArtista(spotifyArtista: SpotifyApi.ArtistObjectFull): iArtista {
    return {
        id: spotifyArtista.id,
        imgUrl: spotifyArtista.images.sort((a, b) => a.width - b.width).pop()?.url,
        nome: spotifyArtista.name
    }

}

export function SpotifyTrackParaMusica(spotifyTrack: SpotifyApi.TrackObjectFull): iMusica {
    if(!spotifyTrack){
        return newMusica()
    }

    const msParaMinutos = (ms: number) => {
        const milissegundos = ms;
        const segundos = Math.floor(milissegundos / 1000);
        const minutos = Math.floor(segundos / 60);
        const segundos_restantes = segundos % 60;

        
        return `${minutos}:${segundos_restantes}`
    }


    return {
        id: spotifyTrack.uri,
        titulo: spotifyTrack.name,
        album: {
            id: spotifyTrack.id,
            imgUrl: spotifyTrack.album.images.shift().url,
            nome: spotifyTrack.album.name,
        },
        artitas: spotifyTrack.artists.map(e => ({
            id: e.id,
            nome: e.name
        })),
        tempo: msParaMinutos(spotifyTrack.duration_ms)

    }
}