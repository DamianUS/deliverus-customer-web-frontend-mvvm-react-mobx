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
import LoginForm from "../../../../components/organisms/LoginForm";
import CreateRestaurantForm from "./CreateRestaurantForm";

const {Text, Paragraph} = Typography;

type Props = {
    onSuccess?: (restaurant:Restaurant) => void;
    onError?: (error: ValidationError|undefined) => void;
    visible: boolean;
    onClose: () => void;
}

const CreateRestaurantModal = observer((props:Props) => {
    const [form] = Form.useForm();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // @ts-ignore

    return (
        <Modal
            open={props.visible}
            title="Crear restaurante"
            onCancel={props.onClose}
            okText="Guardar"
            cancelText="Cancelar"
            onOk={form.submit}
        >
            <CreateRestaurantForm form={form} onError={props.onError} onSuccess={props.onSuccess}></CreateRestaurantForm>
        </Modal>

    );
});

export default CreateRestaurantModal;
