import Model from "../interfaces/Model";

class RestaurantCategory implements Model{
    id?: number;
    name!: string;
    createdAt?: Date;

    updatedAt?: Date;

    getProperties(): string[] {
        return ['id', 'name', 'createdAt', 'updatedAt'];
    }
}

export default  RestaurantCategory
