import Repository from "../../../interfaces/Repository";
import User from "../User";

interface UserRepository extends Repository<User>{
    getByEmailAndPassword(email: string, password: string): Promise<User|undefined>
    getByToken(token: string): Promise<User|undefined>

}
export default UserRepository
