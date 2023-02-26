import RestaurantCategory from "../restaurantCategory/RestaurantCategory";
import User from "../user/User";
import Model from "../interfaces/Model";

class Restaurant implements Model{
    id!: number;
    name!: string;
    description?: string;
    address!: string;
    postalCode!: string;
    url?: string;
    shippingCosts!: number;
    averageServiceMinutes?: number;
    email?: string;
    phone?: string;
    logo?: string;
    heroImage?:string;
    status!: string;
    category!: RestaurantCategory;
    owner?: User|null;
    createdAt?: Date;
    updatedAt?: Date;

    getProperties(){
        return [
            'id', 'name', 'description', 'address', 'postalCode',
            'url', 'shippingCosts', 'averageServiceMinutes', 'email',
            'phone', 'logo', 'heroImage', 'status', 'category',
            'owner', 'createdAt', 'updatedAt'
        ]
    }

    get fullAddress() {
        return `${this.address}, ${this.postalCode}`
    }
}

export default Restaurant
