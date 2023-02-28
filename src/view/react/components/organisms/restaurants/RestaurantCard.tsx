import React from 'react';
import {Card, Typography, Divider, Row, Col, Space} from 'antd';
import {FieldTimeOutlined, DollarCircleOutlined} from '@ant-design/icons';
import Restaurant from "../../../../../model/restaurant/Restaurant";
const {Meta} = Card;
const {Text,Paragraph} = Typography;


type Props = {
    restaurant: Restaurant,
    onClick?: () => void,
}

const RestaurantCard = (props:Props) => {

    return (
        <Card
            cover={
                <img
                    alt="Restaurant logo"
                    src={props.restaurant.logo ?? "/restaurants/defaultLogo.jpeg"}
                />
            }
            /*actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
            ]}*/
        >
            <Meta
                title={props.restaurant.name}
                description={
                <>
                    <Paragraph style={{height:50}} ellipsis={{rows:2}}>{props.restaurant.description}</Paragraph>
                    <Divider/>
                    <Row>
                        <Col span={12}>
                            <Space>
                                <FieldTimeOutlined />
                                <Text style={{alignSelf: 'self-end'}}>{props.restaurant.averageServiceMinutes ?? '30-60'} mins.</Text>
                            </Space>
                        </Col>
                        <Col span={12} type="flex" align="end">
                            <Space>
                                <DollarCircleOutlined />
                                <Text style={{alignSelf: 'self-end'}}>{props.restaurant.shippingCosts} €</Text>
                            </Space>
                        </Col>

                    </Row>

                </>
                }
            />
        </Card>
  );
};

export default RestaurantCard;
