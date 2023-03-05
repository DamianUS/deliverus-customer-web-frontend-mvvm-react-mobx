import React from 'react';
import { observer } from "mobx-react-lite"
import LoginViewModel from "../../../../../viewmodel/authentication/LoginViewModel";
import inversifyContainer from "../../../../../config/inversify.config";
import {Form, Modal, Input, Button, Checkbox, Typography, Col, FormInstance, Result, Alert} from "antd";
import {convertFromValidationErrorToAntDFormFields} from "../../../validation/ConversorToAntDFormFields";
import { useNavigate } from "react-router-dom";
import HomeRouteProvider from "../../../routes/HomeRouteProvider";

const {Text, Paragraph} = Typography;

type Props = {
    form?: FormInstance;
}

const LoginForm = observer((props:Props) => {
    const navigate = useNavigate();
    const [viewModel] = React.useState(inversifyContainer.get<LoginViewModel>("LoginViewModel"))
    const [form] = Form.useForm();
    const loginFormSubmit = async (values:any) => {
        const {email, password} = values;
        const protectedRoute = viewModel.globalState.protectedRoute
        await viewModel.login(email, password);
        let fields = convertFromValidationErrorToAntDFormFields(viewModel.initialValues, viewModel.loginValidationError)
        // @ts-ignore
        props.form ? props.form.setFields(fields) : form.setFields(fields)
        if(viewModel.loginValidationError === undefined && viewModel.loginError === undefined && viewModel.globalState.backendError === undefined){
            //Needs to navigate one way or another
            if(protectedRoute !== undefined){
                return navigate(protectedRoute);
            }
            else{
                const homeRouteProvider = inversifyContainer.get<HomeRouteProvider>("HomeRouteProvider");
                return navigate(homeRouteProvider.homeRoute);
            }
        }

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // @ts-ignore

    return (
        <Form
            layout="vertical"
            form={props.form ?? form}
            initialValues={viewModel.initialValues}
            onFinish={loginFormSubmit}
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

            {viewModel.loginError && <Alert className="mb-10"
                message="Wrong credentials"
                description="The user/password do not match our records."
                type="error"
                showIcon
            />
            }

            {!props.form && <Form.Item>
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>}
        </Form>
    );
});

export default LoginForm;
