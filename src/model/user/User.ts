import UserType from "./UserType";

class User{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    token: string;
    tokenExpiration: Date;
    phone: string;
    avatar: string;
    address: string;
    postalCode: string;
    userType: UserType;
    createdAt: Date;
    updatedAt: Date;

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`
    }

    get remainingSessionSeconds(): number{
        return (this.tokenExpiration.getTime() - new Date().getTime()) / 1000
    }

    constructor(id: number, firstName: string, lastName: string, email: string, password: string, token: string, tokenExpiration: Date, phone: string, avatar: string, address: string, postalCode: string, userType: UserType, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.token = token;
        this.tokenExpiration = tokenExpiration;
        this.phone = phone;
        this.avatar = avatar;
        this.address = address;
        this.postalCode = postalCode;
        this.userType = userType;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export default User;
