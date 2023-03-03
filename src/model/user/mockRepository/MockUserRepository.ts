import 'reflect-metadata'
import usersMocked from "./users.json";
import {injectable} from "inversify";
import User from "../User";
import MockUserConversor, {MockUserObject} from "./MockUserConversor";
import BaseMockRepository from "../../mocks/BaseMockRepository";
import UserRepository from "../interfaces/UserRepository";
import disableable from "../../mocks/decorators/Disableable";
import { cloneDeep } from "lodash";

@injectable()
class MockUserRepository extends BaseMockRepository<User> implements UserRepository{
    private conversor:MockUserConversor;

    constructor() {
        super()
        this.conversor = new MockUserConversor();
        this.entities = usersMocked.map((userObject) => this.conversor.convertToInternalEntity(userObject));
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
