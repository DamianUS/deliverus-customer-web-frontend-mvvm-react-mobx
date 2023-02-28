import 'reflect-metadata'
import usersMocked from "./users.json";
import {injectable} from "inversify";
import User from "../User";
import MockUserConversor, {MockUserObject} from "./MockUserConversor";
import BaseMockRepository from "../../mocks/BaseMockRepository";
@injectable()
class MockUserRepository extends BaseMockRepository<User>{
    private conversor:MockUserConversor;

    constructor() {
        super()
        this.conversor = new MockUserConversor();
        this.entities = usersMocked.map((userObject) => this.conversor.convertToInternalEntity(userObject));
    }


}
export default MockUserRepository;
