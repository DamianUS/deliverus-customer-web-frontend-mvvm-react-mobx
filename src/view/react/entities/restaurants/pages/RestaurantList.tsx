import React from 'react';
import inversifyContainer from "../../../../../config/inversify.config";
import IndexRestaurantsViewModel from "../../../../../viewmodel/restaurants/IndexRestaurantsViewModel";
import { observer } from "mobx-react-lite"
import BaseLayout from "../../../components/templates/BaseLayout";
import RestaurantCard from "../components/organisms/RestaurantCard";


const RestaurantList = observer(() => {

    const [viewModel] = React.useState(inversifyContainer.get<IndexRestaurantsViewModel>("IndexRestaurantsViewModel"))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // @ts-ignore
    React.useEffect(() => {
        const initializer = async () =>{await viewModel.initialize()}
        initializer()
    }, [viewModel])

    return (
        <BaseLayout>

                    <div className="grid gap-y-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 md:gap-x-4 lg:gap-x-6">
                        {
                            viewModel.restaurants && viewModel.restaurants.length > 0 ?
                            viewModel.restaurants?.map(restaurant => {
                            return <RestaurantCard restaurant={restaurant}></RestaurantCard>
                        })
                                // @ts-ignore
                                : [...Array(12).keys()].map(_ => <RestaurantCard/>)
                        }
                    </div>

        </BaseLayout>
  );
});

export default RestaurantList;
