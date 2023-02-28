import User from "../../user/User";

interface AuthenticationRepository{
    login(email: string, password: string): Promise<User|undefined>
}

export default AuthenticationRepository
