import User from "../../user/User";

interface AuthenticationRepository{
    login(email: string, password: string): Promise<User|undefined>
    logout(loggedInUser: User): Promise<User|undefined>
}

export default AuthenticationRepository
