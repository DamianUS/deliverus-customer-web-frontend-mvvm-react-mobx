import User from "../../../model/user/User";
import {BearerToken} from "../../../model/authentication/types/BearerToken";
interface TokenStorer {
    store(loggedInUser: User):boolean;
    retrieve():Promise<User|undefined>;
    clear():boolean;
}

export default TokenStorer
export type {BearerToken}
