import UserType from "../../../model/models/user/UserType";
import GlobalState from "../../../viewmodel/GlobalState";
import inversifyContainer from "../../../config/inversify.config";
import {injectable} from "inversify";



@injectable()
class HomeRouteProvider{

    _globalState: GlobalState;
    constructor() {
        this._globalState = inversifyContainer.get<GlobalState>("GlobalState");
    }
    get homeRoute():string{
        let route = "/";
        const loggedInUser = this._globalState.loggedInUser;
        if(loggedInUser?.userType === "customer"){
            return "/restaurants";
        }
        else if(loggedInUser?.userType === "owner"){
            return `/restaurants-owner`;
        }
        return route;
    }
}

export default HomeRouteProvider;
