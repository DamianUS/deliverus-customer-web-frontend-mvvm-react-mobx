import 'reflect-metadata'
import usersMocked from "./users.json";
import {injectable} from "inversify";
import User from "../../../models/user/User";
import MockUserConversor, {MockUserObject} from "./MockUserConversor";
import BaseMockRepository from "../BaseMockRepository";
import UserRepository from "../../../models/user/interfaces/UserRepository";
import disableable from "../decorators/Disableable";
import { cloneDeep } from "lodash";
import ModelConversor from '../../../conversion/interfaces/ModelConversor';

@injectable()
class MockUserRepository extends BaseMockRepository<User> implements UserRepository {
    private _conversor:MockUserConversor;

    constructor() {
        super()
        this._conversor = new MockUserConversor();
    }
    get mockedEntites(): object[] {
        return usersMocked;
    }
    get conversor(): ModelConversor<User> {
        return this._conversor;
    }
    get creationValidationSchema(): object|undefined {
        return undefined;
    }
    get updateValidationSchema(): object|undefined {
        return undefined;
    }

    @disableable()
    async getByEmailAndPassword(email: string, password: string): Promise<User | undefined> {
        const users = await this.getAll()
        const foundUser = users.find(user => user.email === email && user.password === password);
        if(!foundUser)
            return undefined
        return cloneDeep(foundUser);
    }
    @disableable()
    async getByToken(token: string): Promise<User | undefined> {
        const users = await this.getAll()
        const foundUser = users.find(user => user.token === token && user.tokenExpiration && user.tokenExpiration > new Date());
        if(!foundUser)
            return undefined
        return cloneDeep(foundUser);
    }


}
export default MockUserRepository;
