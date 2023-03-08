import React from 'react';
import { observer } from "mobx-react-lite"
import LoginViewModel from "../../../../../../viewmodel/authentication/LoginViewModel";
import inversifyContainer from "../../../../../../config/inversify.config";
import {
    Form,
    Modal,
    Input,
    Button,
    Checkbox,
    Typography,
    Col,
    FormInstance,
    Result,
    Alert,
    InputNumber,
    Select
} from "antd";
import {convertFromValidationErrorToAntDFormFields} from "../../../../validation/ConversorToAntDFormFields";
import { useNavigate } from "react-router-dom";
import HomeRouteProvider from "../../../../routes/HomeRouteProvider";
import CreateRestaurantViewModel from "../../../../../../viewmodel/restaurants/CreateRestaurantViewModel";
import Restaurant from "../../../../../../model/models/restaurant/Restaurant";
import ValidationError from "../../../../../../model/errors/ValidationError";

const {Text, Paragraph} = Typography;

type Props = {
    form?: FormInstance;
    onSuccess?: (restaurant:Restaurant) => void;
    onError?: (error: ValidationError|undefined) => void;
}

const CreateRestaurantForm = observer((props:Props) => {
    const [viewModel] = React.useState(inversifyContainer.get<CreateRestaurantViewModel>("CreateRestaurantViewModel"))
    const [form] = Form.useForm();
    const createFormSubmit = async (values:any) => {
        const restaurantCreated = await viewModel.create(values);
        let fields = convertFromValidationErrorToAntDFormFields(viewModel.initialValues, viewModel.validationError)
        const currentForm = props.form ? props.form : form
        // @ts-ignore
        currentForm.setFields(fields)
        const isCorrectlyCreated = viewModel.validationError === undefined &&
            viewModel.globalState.authenticationError === undefined &&
            viewModel.globalState.backendError === undefined &&
            restaurantCreated instanceof Restaurant
        if(isCorrectlyCreated && props.onSuccess){
            currentForm.resetFields();
            props.onSuccess(restaurantCreated);
        }
        else if(props.onError)
            props.onError(viewModel.validationError);
    }

    const restaurantCategoryOptions = () => {
        return viewModel.restaurantCategories?.map(category => {
            return {value:category.id, label:category.name}
        })
    }

    React.useEffect(() => {
        const initializer = async () =>{await viewModel.initialize()}
        initializer()
    }, [viewModel])

    return (
        <Form
            layout="vertical"
            form={props.form ?? form}
            initialValues={viewModel.initialValues}
            onFinish={createFormSubmit}
            autoComplete="off"
        >
            <Form.Item label="Nombre" name="name">
                <Input size="large" />
            </Form.Item>

            <Form.Item label="Dirección" name="address">
                <Input size="large" />
            </Form.Item>

            <Form.Item label="Código Postal" name="postalCode">
                <Input size="large" />
            </Form.Item>

            <Form.Item label="Gastos de envío" name="shippingCosts">
                <InputNumber size="large" addonAfter="€" defaultValue={0} className="w-full" />
            </Form.Item>

            <Form.Item label="Categoría" name="restaurantCategoryId">
                {viewModel.restaurantCategories &&
                    <Select placeholder="Selecciona una categoría"
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            size="large"
                            options={restaurantCategoryOptions()} />}
            </Form.Item>


            {!props.form && <Form.Item>
                <Button type="primary" htmlType="submit">
                    Guardar
                </Button>
            </Form.Item>}
        </Form>
    );
});

export default CreateRestaurantForm;
