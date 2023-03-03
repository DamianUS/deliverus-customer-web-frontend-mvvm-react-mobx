import { injectable } from 'inversify'
import TokenStorer, {BearerToken} from "./interfaces/TokenStorer";
import User from "../../model/user/User";
import AuthenticationRepository from "../../model/authentication/interfaces/AuthenticationRepository";
import GlobalState from "../../viewmodel/GlobalState";
import inversifyContainer from "../../config/inversify.config";
import "reflect-metadata"
import MockAuthenticationRepository from "../../model/authentication/MockAuthenticationRepository";


class LocalStorageMock {
    store:object;
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key:string) {
        // @ts-ignore
        return this.store[key] || undefined;
    }

    setItem(key:string, value:any) {
        // @ts-ignore
        this.store[key] = String(value);
    }

    removeItem(key:string) {
        // @ts-ignore
        delete this.store[key];
    }
}

const createBearerTokenFromUser = (user:User):BearerToken => {
    const bearerToken: BearerToken = {
        token: user.token as string,
        expirationDate: user.tokenExpiration as Date
    };
    return bearerToken;
}

@injectable()
export default class MockLocalStorageStorer implements TokenStorer {
    private storageKey = "deliverus_token";
    private localStorageMock:LocalStorageMock;
    authenticationRepository:AuthenticationRepository;
    private globalState:GlobalState;

    constructor() {
        this.localStorageMock = new LocalStorageMock();
        this.authenticationRepository = new MockAuthenticationRepository();
        this.globalState = inversifyContainer.get<GlobalState>("GlobalState");
    }

    async retrieve(): Promise<User | undefined> {
        let retrievedUser = undefined;
        try{
            const tokenObject = JSON.parse(this.localStorageMock.getItem(this.storageKey) || "")
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
            this.localStorageMock.setItem(this.storageKey, JSON.stringify(token))
            stored = true;
        }
        return stored;
    }

    clear(): boolean {
        this.localStorageMock.clear();
        return true;
    }

}
