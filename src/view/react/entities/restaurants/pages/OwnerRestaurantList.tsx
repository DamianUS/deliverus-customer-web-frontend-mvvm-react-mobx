import React from 'react';
import inversifyContainer from "../../../../../config/inversify.config";
import { observer } from "mobx-react-lite"
import BaseLayout from "../../../components/templates/BaseLayout";
import OwnerRestaurantsViewModel from "../../../../../viewmodel/restaurants/OwnerRestaurantsViewModel";
import {Breadcrumb, Button, Space, Table, Tag, Tooltip, Typography, Popconfirm, message, Dropdown} from "antd";
import {
    CheckCircleOutlined,
    CloseCircleOutlined, DeleteOutlined, EditOutlined,
    HomeOutlined,
    PoweroffOutlined,
    ShopOutlined, ZoomInOutlined
} from "@ant-design/icons";
import CreateRestaurantModal from "../components/organisms/CreateRestaurantModal";
import type { ColumnsType } from 'antd/es/table';
import Restaurant from "../../../../../model/models/restaurant/Restaurant";
import RestaurantCategory from "../../../../../model/models/restaurantCategory/RestaurantCategory";
import RestaurantStatus from "../../../../../model/models/restaurant/RestaurantStatus";
import type { MenuProps } from 'antd';
import { Link } from "react-router-dom";
import restaurant from "../../../../../model/models/restaurant/Restaurant";
const {Text} = Typography;

const RestaurantList = observer(() => {

    const breadCrumb = <Breadcrumb separator={<span className="text-xl">/</span>}>
        <Breadcrumb.Item href="/">
            <HomeOutlined style={{fontSize:18}} />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/restaurants-owner">
            <ShopOutlined style={{fontSize:18}} />
            <span className="text-xl">Tus restaurantes</span>
        </Breadcrumb.Item>
    </Breadcrumb>


    const buildRestaurantDropDownItems = (restaurant: Restaurant) => {
        const items = [
            {
                label: <Link to={`/restaurants/${restaurant.id}/products`}>Manage products</Link>,
                key: '0',
            },
            {
                type: 'divider',
            },
            {
                label: <Link to={`/restaurants/${restaurant.id}/orders`}>Manage orders</Link>,
                key: '1',
            },
        ];
        return {items: items};
    }


    // @ts-ignore
    const tableColumns: ColumnsType<Restaurant> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            className: 'w-80'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: {
                showTitle: false
            },
            render: (description) => (
                <Tooltip placement="topLeft" title={description}>
                    {description}
                </Tooltip>
            )
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            className: 'w-36',
            render: (restaurantCategory: RestaurantCategory) => <Text>{restaurantCategory.name}</Text>
        },
        {
            title: 'Products',
            dataIndex: 'products',
            key: 'products',
            className: 'w-36',
            align: 'center',
            render: (_, restaurant) => <Text>N/A</Text>
        },
        {
            title: '#Orders yesterday',
            dataIndex: 'numOrders',
            key: 'numOrders',
            className: 'w-40',
            align: 'center',
            render: (_, restaurant) => <Text>N/A</Text>
        },
        {
            title: 'Billed yesterday',
            dataIndex: 'billing',
            key: 'billing',
            className: 'w-40',
            align: 'center',
            render: (_, restaurant) => <Text>N/A</Text>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            className: 'w-32',
            align: 'center',
            key: 'status',
            render: (restaurantStatus: RestaurantStatus) => <Tag>{getStatusTag(restaurantStatus)}</Tag>
        },
        {
            title: 'Actions',
            key: 'action',
            className: 'w-40',
            align: 'center',
            render: (_, restaurant) => (
                <Space size="middle">
                    <Tooltip title={`Manage restaurant ${restaurant.name}'s products and orders`}>
                        {/* @ts-ignore */}
                        <Dropdown menu={buildRestaurantDropDownItems(restaurant)} trigger={['click']}>
                            <Button shape="circle" icon={<ZoomInOutlined />} />
                        </Dropdown>
                    </Tooltip>
                    <Tooltip title={`Edit restaurant ${restaurant.name}`}>
                        <Button shape="circle" type="primary" ghost icon={<EditOutlined />} />
                    </Tooltip>
                        <Popconfirm
                        title={`Delete ${restaurant.name}`}
                        description="Are you sure to delete this restaurant?"
                        onConfirm={() => {removeRestaurant(restaurant)}}
                        onCancel={() => {}}
                        okText="Yes"
                        cancelText="No">
                        <Button shape="circle" danger ghost icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const getStatusTag = (status:RestaurantStatus):JSX.Element => {
        let color = 'warning';
        let icon = <PoweroffOutlined/>
        if(status.valueOf() === RestaurantStatus.closed.valueOf()){
            color = 'error';
            icon = <CloseCircleOutlined/>
        }
        else if(status.valueOf() === RestaurantStatus.online.valueOf()){
            color = 'success';
            icon = <CheckCircleOutlined/>
        }
        return <Tag className="border-none py-1" color={color} icon={icon}>{status.valueOf()}</Tag>
    }

    const [viewModel] = React.useState(inversifyContainer.get<OwnerRestaurantsViewModel>("OwnerRestaurantsViewModel"))
    const [showModal, setShowModal] = React.useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const [selectedRestaurant, setSelectedRestaurant] = React.useState(undefined);

    const toggleModalVisibility = () => {
        setShowModal(!showModal);
    }
    const onSuccess = async () => {
        await viewModel.initialize();
        toggleModalVisibility();
    }

    const removeRestaurant = async(restaurant: Restaurant) => {
        await viewModel.remove(restaurant);
        if(!viewModel.globalState.hasErrors){
            messageApi.open({
                type: 'success',
                content: 'El restaurante se ha borró con éxito',
            });
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // @ts-ignore
    React.useEffect(() => {
        const initializer = async () =>{await viewModel.initialize()}
        initializer()
    }, [viewModel])

    return (
        <>
            <CreateRestaurantModal visible={showModal} onClose={toggleModalVisibility} onSuccess={onSuccess}></CreateRestaurantModal>
            <BaseLayout pageTitle={breadCrumb}>
                <div className="flex justify-center mb-10">
                <Button type="primary" size="large" className="w-full md:w-auto" onClick={toggleModalVisibility}>Crear restaurante</Button>
                </div>
                <Table columns={tableColumns} dataSource={viewModel.restaurants} />
            </BaseLayout>
        </>

    );
});

export default RestaurantList;
