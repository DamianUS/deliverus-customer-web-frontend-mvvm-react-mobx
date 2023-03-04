import React from 'react';
import { observer } from "mobx-react-lite"
import LoginViewModel from "../../../../../viewmodel/authentication/LoginViewModel";
import inversifyContainer from "../../../../../config/inversify.config";
import {Form, Modal, Input, Button, Checkbox, Typography, Col} from "antd";
import {convertFromValidationErrorToAntDFormFields} from "../../../validation/ConversorToAntDFormFields";
import LoginForm from "./LoginForm";
const {Text} = Typography;

type Props = {
    visible: boolean;
    onClose: any;
}

const LoginModal = observer((props:Props) => {

    const [form] = Form.useForm();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // @ts-ignore

    return (
        <Modal
            open={props.visible}
            title="Login"
            onCancel={props.onClose}
            okText="Login"
            cancelText="Cancel"
            onOk={form.submit}
        >
            <LoginForm form={form}></LoginForm>
        </Modal>

    );
});

export default LoginModal;
