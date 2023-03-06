import { injectable } from 'inversify'
import TokenStorer, {BearerToken} from "./interfaces/TokenStorer";
import User from "../../model/models/user/User";
import "reflect-metadata"
import inversifyContainer from "../../config/inversify.config";
import GlobalState from "../../viewmodel/GlobalState";
import AuthenticationRepository from "../../model/models/authentication/interfaces/AuthenticationRepository";

const createBearerTokenFromUser = (user:User):BearerToken => {
    const bearerToken: BearerToken = {
        token: user.token as string,
        expirationDate: user.tokenExpiration as Date
    };
    return bearerToken;
}

@injectable()
export default class BrowserLocalStorageStorer implements TokenStorer {
    private globalState:GlobalState;
    private authenticationRepository:AuthenticationRepository;

    constructor() {
        this.authenticationRepository = inversifyContainer.get<AuthenticationRepository>("AuthenticationRepository");
        this.globalState = inversifyContainer.get<GlobalState>("GlobalState");
    }

    private storageKey = "deliverus_token";
    async retrieve(): Promise<User | undefined> {
        let retrievedUser = undefined;
        try{
            const tokenObject = JSON.parse(localStorage.getItem(this.storageKey) || "")
            if(tokenObject.token && new Date(tokenObject.expirationDate) > new Date()){
                //Esto podría ser un riesgo de seguridad, pensar bien
                retrievedUser = await this.authenticationRepository.loginByToken(tokenObject.token)
                if(retrievedUser)
                    this.store(retrievedUser);
            }
            return retrievedUser;
        }
        catch (error){
            return retrievedUser;
        }
    }

    store(loggedInUser: User): boolean {
        let stored:boolean = false;
        if(loggedInUser.token && loggedInUser.tokenExpiration && loggedInUser.tokenExpiration > new Date()){
            const token = createBearerTokenFromUser(loggedInUser)
            localStorage.setItem(this.storageKey, JSON.stringify(token))
            stored = true;
        }
        return stored;
    }

    clear(): boolean {
        localStorage.clear();
        return true;
    }


}

