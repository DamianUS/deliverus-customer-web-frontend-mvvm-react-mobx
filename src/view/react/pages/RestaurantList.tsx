import React from 'react';
import inversifyContainer from "../../../config/inversify.config";
import IndexRestaurantsViewModel from "../../../viewmodel/restaurants/IndexRestaurantsViewModel";
import { observer } from "mobx-react-lite"
import BaseLayout from "../templates/BaseLayout";
import {Col,Row} from "antd"
import Restaurant from "../../../model/restaurant/Restaurant";
import {arrayToDynamicNumberOfBuckets} from "../../../helpers/ArrayToBuckets";
import RestaurantCard from "../components/organisms/restaurants/RestaurantCard";


const RestaurantList = observer(() => {

    const [viewModel] = React.useState(inversifyContainer.get<IndexRestaurantsViewModel>("IndexRestaurantsViewModel"))
    const [numberOfRestaurantsPerRow, setNumberOfRestaurantsPerRow] = React.useState(4)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // @ts-ignore
    React.useEffect(() => {
        const initializer = async () =>{await viewModel.initialize()}
        initializer()
    }, [viewModel])

    return (
        <BaseLayout>
                {viewModel.restaurants && viewModel.restaurants.length > 0
                    ?
                    arrayToDynamicNumberOfBuckets(viewModel.restaurants, numberOfRestaurantsPerRow).map(restaurantArray => {
                        return <Row gutter={[{ xs: 8, lg: 32 },{ xs: 8, lg: 32 }]}>
                            {restaurantArray.map(restaurant => {
                                return <Col xs={1} lg={24/numberOfRestaurantsPerRow}>
                                    <RestaurantCard restaurant={restaurant}></RestaurantCard>
                                </Col>
                            })}
                        </Row>
                    })
                    :
                    <span>No restaurants yet</span>
                }
        </BaseLayout>
  );
});

export default RestaurantList;
