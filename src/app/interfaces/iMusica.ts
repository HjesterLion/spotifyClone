export interface iMusica {
    id:string,
    titulo:string,
    artitas: {
        id:string,
        nome:string
    }[],
    album:{
        id:string,
        nome:string,
        imgUrl:string
    },
    tempo:string,
    play?:boolean,
    progresso?:number,
    progressoTotal?:number

}