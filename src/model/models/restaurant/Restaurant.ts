import RestaurantCategory from "../restaurantCategory/RestaurantCategory";
import User from "../user/User";
import Model from "../../interfaces/Model";
import RestaurantStatus from "./RestaurantStatus";

class Restaurant implements Model{
    id: number|undefined;
    name!: string;
    description?: string;
    address!: string;
    postalCode!: string;
    url?: string;
    shippingCosts!: number;
    averageServiceMinutes?: number;
    email?: string;
    phone: string|undefined;
    logo: string|undefined;
    heroImage:string|undefined;
    status!: RestaurantStatus;
    category!: RestaurantCategory;
    owner?: User|null;
    createdAt: Date|undefined;
    updatedAt: Date|undefined;

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
