import {GuardMiddleware} from 'react-router-guarded-routes'
import inversifyContainer from "../../../../config/inversify.config";
import GlobalState from "../../../../viewmodel/GlobalState";
import HomeRouteProvider from "../HomeRouteProvider";

const isGuest: GuardMiddleware = (to, from, next) => {
    const globalState = inversifyContainer.get<GlobalState>("GlobalState");
    const homeRouteProvider = inversifyContainer.get<HomeRouteProvider>("HomeRouteProvider");
    if(globalState.loggedInUser === undefined){
        next(); // call next function to run the next middleware or show the route element, it accepts the same parameters as navigate (useNavigate()) and behaves consistently.
    }
    else{
        next(homeRouteProvider.homeRoute);
    }
}

export default isGuest;
