import Login from "../pages/Login";
import PanelAdmin from "../pages/PanelAdmin";
import PanelUser from "../pages/PanelUser";
import Register from "../pages/Register";
import Reserva from "../pages/Reserva";

export let routerApp = [
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/admin',
        element: <PanelAdmin />
    },
    {
        path: '/user',
        element: <PanelUser />
    },
    {
        path: '/reserva',
        element: <Reserva />
    },
]