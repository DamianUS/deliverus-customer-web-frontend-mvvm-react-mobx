import React from 'react';
import {observer} from "mobx-react-lite"
import {Result} from "antd";
import BaseLayout from "../templates/BaseLayout";
import LoginForm from "../components/organisms/auth/LoginForm";

const Login = observer(() => {

    return (
        <BaseLayout>
            <Result
                status="warning"
                title="You need to be logged in to access to this resource. This is a test page"
            />
            <LoginForm></LoginForm>
        </BaseLayout>
    );
});
export default Login;
