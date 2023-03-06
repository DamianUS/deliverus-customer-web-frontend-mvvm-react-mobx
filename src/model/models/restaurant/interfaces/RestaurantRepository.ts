import Repository from "../../../interfaces/Repository";
import Restaurant from "../Restaurant";
import User from "../../user/User";

interface RestaurantRepository extends Repository<Restaurant>{

    getOwnerRestaurants(owner: User): Promise<Restaurant[]>

}
export default RestaurantRepository
