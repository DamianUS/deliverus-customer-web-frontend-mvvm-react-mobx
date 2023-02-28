import 'reflect-metadata'
import usersMocked from "./users.json";
import {injectable} from "inversify";
import User from "../User";
import MockUserConversor, {MockUserObject} from "./MockUserConversor";
import BaseMockRepository from "../../mocks/BaseMockRepository";
import UserRepository from "../interfaces/UserRepository";
import disableable from "../../mocks/decorators/Disableable";
@injectable()
class MockUserRepository extends BaseMockRepository<User> implements UserRepository{
    private conversor:MockUserConversor;

    constructor() {
        super()
        this.conversor = new MockUserConversor();
        this.entities = usersMocked.map((userObject) => this.conversor.convertToInternalEntity(userObject));
    }

    @disableable()
    async getByEmailAndPassword(email: string, password: string): Promise<User | undefined> {
        const users = await this.getAll()
        return users.find(user => user.email === email && user.password === password);
    }


}
export default MockUserRepository;
