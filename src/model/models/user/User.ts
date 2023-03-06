import UserType from "./UserType";
import Model from "../../interfaces/Model";

class User implements Model{
    id: number|undefined;
    firstName: string|undefined;
    lastName: string|undefined;
    email: string|undefined;
    password: string|undefined;
    token: string|undefined;
    tokenExpiration: Date|undefined;
    phone: string|undefined;
    avatar: string|undefined;
    address: string|undefined;
    postalCode: string|undefined;
    userType: UserType|undefined;
    createdAt: Date|undefined;
    updatedAt: Date|undefined;

    getProperties(): string[] {
        return ['id', 'firstName', 'lastName', 'email', 'password', 'token', 'tokenExpiration', 'phone', 'avatar', 'address', 'postalCode', 'userType', 'createdAt', 'updatedAt'];
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`
    }

    get remainingSessionSeconds(): number{
        return this.tokenExpiration ? (this.tokenExpiration.getTime() - new Date().getTime()) / 1000 : 0
    }
}

export default User;
