import {GuardMiddleware} from 'react-router-guarded-routes'
import inversifyContainer from "../../../../config/inversify.config";
import GlobalState from "../../../../viewmodel/GlobalState";

const guestGuard: GuardMiddleware = (to, from, next) => {
    const globalState = inversifyContainer.get<GlobalState>("GlobalState");
    if(globalState.loggedInUser === undefined){
        next(); // call next function to run the next middleware or show the route element, it accepts the same parameters as navigate (useNavigate()) and behaves consistently.
    }
    else{
        next("/restaurants");
    }
}

export default guestGuard;
