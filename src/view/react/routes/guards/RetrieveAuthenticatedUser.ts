import {GuardMiddleware} from 'react-router-guarded-routes'
import inversifyContainer from "../../../../config/inversify.config";
import GlobalState from "../../../../viewmodel/GlobalState";
import TokenStorer from "../../../services/interfaces/TokenStorer";

const retrieveAuthenticatedUser: GuardMiddleware = async (to, from, next) => {
    const globalState = inversifyContainer.get<GlobalState>("GlobalState");
    const tokenStorer = inversifyContainer.get<TokenStorer>("TokenStorer");
    const loggedInUser = await tokenStorer.retrieve();
    if(loggedInUser !== undefined){
        globalState.loggedInUser = loggedInUser;
    }
    next(); // call next function to run the next middleware or show the route element, it accepts the same parameters as navigate (useNavigate()) and behaves consistently.
}

export default retrieveAuthenticatedUser;
