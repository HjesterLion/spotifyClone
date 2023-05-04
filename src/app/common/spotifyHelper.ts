import { iUsuario } from "../interfaces/iUsuarios";

export function SpotifyUserParaUsuario(user:SpotifyApi.CurrentUsersProfileResponse): iUsuario {
    return {
        id:user.id,
        nome:user.display_name,
        imgUrl: user.images.pop()?.url  
    }
}