import { iArtista } from "../interfaces/iArtista";
import { iMusica } from "../interfaces/iMusica";
import { iPlaylist } from "../interfaces/iPlaylist";

export function newArtista():iArtista{
    return{
        id:'',
        imgUrl:'',
        nome:'',
        musicas:[]

    }
}
export function newMusica():iMusica{
    return {
        id:'',
        album:{
            id:'',
            imgUrl:'',
            nome:'',
        },
        artitas:[],
        tempo:'',
        titulo: ''
    }

}

export function newPlaylist():iPlaylist{
    return {
        id:'',
        imagUrl:'',
        nome:'',
        musicas:[]
    }
}