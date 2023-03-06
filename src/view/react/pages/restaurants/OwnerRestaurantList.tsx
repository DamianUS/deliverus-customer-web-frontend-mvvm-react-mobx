import React from 'react';
import inversifyContainer from "../../../../config/inversify.config";
import IndexRestaurantsViewModel from "../../../../viewmodel/restaurants/IndexRestaurantsViewModel";
import { observer } from "mobx-react-lite"
import BaseLayout from "../../templates/BaseLayout";
import RestaurantCard from "../../components/organisms/restaurants/RestaurantCard";
import OwnerRestaurantsViewModel from "../../../../viewmodel/restaurants/OwnerRestaurantsViewModel";
import {Breadcrumb, Button} from "antd";
import {HomeOutlined, ShopOutlined} from "@ant-design/icons";


const RestaurantList = observer(() => {

    const [viewModel] = React.useState(inversifyContainer.get<OwnerRestaurantsViewModel>("OwnerRestaurantsViewModel"))
    const breadCrumb = <Breadcrumb separator={<span className="text-xl">/</span>}>
        <Breadcrumb.Item href="/">
            <HomeOutlined style={{fontSize:18}} />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/restaurants-owner">
            <ShopOutlined style={{fontSize:18}} />
            <span className="text-xl">Tus restaurantes</span>
        </Breadcrumb.Item>
    </Breadcrumb>

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // @ts-ignore
    React.useEffect(() => {
        const initializer = async () =>{await viewModel.initialize()}
        initializer()
    }, [viewModel])

    return (
        <BaseLayout pageTitle={breadCrumb}>
            <div className="flex justify-center">
            <Button type="primary" size="large" className="w-full md:w-auto">Crear restaurante</Button>
            </div>
            <div className="mt-10 grid gap-y-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 md:gap-x-4 lg:gap-x-6">
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
