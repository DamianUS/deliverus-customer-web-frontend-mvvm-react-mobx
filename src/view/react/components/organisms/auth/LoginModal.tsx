import React from 'react';
import { observer } from "mobx-react-lite"
import LoginViewModel from "../../../../../viewmodel/authentication/LoginViewModel";
import inversifyContainer from "../../../../../config/inversify.config";
import {Form, Modal, Input, Button, Checkbox, Typography, Col} from "antd";
import {convertFromValidationErrorToAntDFormFields} from "../../../validation/ConversorToAntDFormFields";
const {Text} = Typography;

type Props = {
    visible: boolean;
    onClose: any;
}

const LoginModal = observer((props:Props) => {

    const [viewModel] = React.useState(inversifyContainer.get<LoginViewModel>("LoginViewModel"))
    const [form] = Form.useForm();

    const generateLoginErrorFields = ():any[] => {
        return [
            {name:"email", errors:["Wrong credentials"]},
            {name:"password", errors:["Wrong credentials"]},
        ]
    }

    const loginFormSubmit = async (values:any) => {
        const {email, password} = values;
        await viewModel.login(email, password);
        let fields = convertFromValidationErrorToAntDFormFields(viewModel.initialValues, viewModel.loginValidationError)
        // @ts-ignore
        form.setFields(fields)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // @ts-ignore

    return (
        <Modal
            open={props.visible}
            title="Login"
            footer={[]}
            onCancel={props.onClose}
        >
            <Form
                layout="vertical"
                form={form}
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

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Col offset={8} span={16}>
                    {viewModel.loginError && <div className="mb-10"><Text type="danger">Wrong credentials</Text></div>}
                </Col>



                <Form.Item>
                    <Button type="primary" size="large" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>

    );
});

export default LoginModal;
