import {GuardMiddleware} from 'react-router-guarded-routes'
import inversifyContainer from "../../../../config/inversify.config";
import GlobalState from "../../../../viewmodel/GlobalState";
import UserType from "../../../../model/user/UserType";

const isOwner: GuardMiddleware = async (to, from, next) => {
    const globalState = inversifyContainer.get<GlobalState>("GlobalState");
    if(globalState.loggedInUser && globalState.loggedInUser.userType === UserType.owner){
        next(); // call next function to run the next middleware or show the route element, it accepts the same parameters as navigate (useNavigate()) and behaves consistently.
    }
    else{
        next("/unauthorized");
    }
}

export default isOwner;
