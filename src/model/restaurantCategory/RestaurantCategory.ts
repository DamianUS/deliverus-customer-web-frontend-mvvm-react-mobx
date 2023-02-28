import Model from "../interfaces/Model";

class RestaurantCategory implements Model{
    id: number|undefined;
    name!: string;
    createdAt: Date|undefined;

    updatedAt: Date|undefined;

    getProperties(): string[] {
        return ['id', 'name', 'createdAt', 'updatedAt'];
    }
}

export default  RestaurantCategory
