import { Routes } from "@angular/router"
import { AutenticadoGuard } from "./guards/autenticado.guard"
import { LoginModule } from "./pages/login/login.module"
import { PlayerModule } from "./pages/player/player.module"

export const AppRotas: Routes = [
    {
        path:'',
        redirectTo:'player',
        pathMatch:'full'
    },
    {
        path:'login',
        loadChildren: () => LoginModule
    },
    {
        path:'player',
        loadChildren: () => PlayerModule,
        canLoad:[AutenticadoGuard]
    }

]