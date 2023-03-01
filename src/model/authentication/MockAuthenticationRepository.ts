import 'reflect-metadata'
import {injectable} from "inversify";
import AuthenticationRepository from "./interfaces/AuthenticationRepository";
import UserRepository from "../user/interfaces/UserRepository";
import inversifyContainer from "../../config/inversify.config";
import User from "../user/User";
import UnauthorizedError from "../errors/UnauthorizedError";
import disableable from "../mocks/decorators/Disableable";

const generateToken = () => {
    return "mockToken"
}
@injectable()
class MockAuthenticationRepository implements AuthenticationRepository{
    private userRepository:UserRepository;
    constructor() {
        this.userRepository = inversifyContainer.get<UserRepository>("UserRepository");
    }

    @disableable()
    async login(email: string, password: string): Promise<User | undefined> {
        const loggedInUser = await this.userRepository.getByEmailAndPassword(email, password)
        if(!loggedInUser)
            throw new UnauthorizedError()
        loggedInUser.token = generateToken()
        loggedInUser.tokenExpiration = new Date(new Date().getTime() + 30*60000);
        return await this.userRepository.save(loggedInUser);
    }
}
export default MockAuthenticationRepository;