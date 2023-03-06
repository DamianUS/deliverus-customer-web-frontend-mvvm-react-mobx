import React from 'react';
import {observer} from "mobx-react-lite"
import {Card, Result} from "antd";
import BaseLayout from "../components/templates/BaseLayout";
import LoginForm from "../components/organisms/LoginForm";
import inversifyContainer from "../../../config/inversify.config";
import LoginViewModel from "../../../viewmodel/authentication/LoginViewModel";

const Login = observer(() => {
    const [viewModel] = React.useState(inversifyContainer.get<LoginViewModel>("LoginViewModel"))

    return (
        <BaseLayout>
            <div className="flex justify-center">
                <Card title="Login" className="flex-none w-full md:w-96">
                    {viewModel.globalState.protectedRoute && <Result
                        status="warning"
                        title="You need to be logged in to access to this resource."
                        extra="You will be redirected to the requested resource after logging in."
                    />}
                <LoginForm></LoginForm>
                </Card>
            </div>
        </BaseLayout>
    );
});
export default Login;
