import React from 'react';
import { observer } from "mobx-react-lite"
import LoginViewModel from "../../../../../../viewmodel/authentication/LoginViewModel";
import inversifyContainer from "../../../../../../config/inversify.config";
import {Form, Modal, Input, Button, Checkbox, Typography, Col, FormInstance, Result, Alert} from "antd";
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
    onError?: (error: ValidationError) => void;
}

const LoginForm = observer((props:Props) => {
    const navigate = useNavigate();
    const [viewModel] = React.useState(inversifyContainer.get<CreateRestaurantViewModel>("CreateRestaurantViewModel"))
    const [form] = Form.useForm();
    const createFormSubmit = async (values:any) => {
        const restaurantCreated = await viewModel.create(values);
        let fields = convertFromValidationErrorToAntDFormFields(viewModel.initialValues, viewModel.validationError)
        // @ts-ignore
        props.form ? props.form.setFields(fields) : form.setFields(fields)
        const isCorrectlyCreated = viewModel.validationError === undefined &&
            viewModel.globalState.authenticationError === undefined &&
            viewModel.globalState.backendError === undefined &&
            restaurantCreated instanceof Restaurant
        if(isCorrectlyCreated && props.onSuccess)
            props.onSuccess(restaurantCreated);

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // @ts-ignore

    return (
        <Form
            layout="vertical"
            form={props.form ?? form}
            initialValues={viewModel.initialValues}
            onFinish={createFormSubmit}
            autoComplete="off"
        >
            <Form.Item label="Email" name="email">
                <Input size="large" />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
            >
                <Input.Password size="large" />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            {!props.form && <Form.Item>
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>}
        </Form>
    );
});

export default LoginForm;
