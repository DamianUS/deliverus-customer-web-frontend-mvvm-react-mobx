import React, {ReactNode} from "react";
import TopBarTemplate from "./TopBarTemplate";
import {Button} from "antd";
import {LoginOutlined} from "@ant-design/icons";
import LoginViewModel from "../../../../viewmodel/authentication/LoginViewModel";
import LoginModal from "../organisms/auth/LoginModal";

type Props = {
    children: ReactNode|undefined
}
function GuestTopBarComponent () {

    const [showModal, setShowModal] = React.useState(false)

    return (
        <>
            <LoginModal></LoginModal>
            <TopBarTemplate>
                <div className="flex justify-end pt-3">
                    <Button type="primary" size="large">Sign in</Button>
                </div>
            </TopBarTemplate>
        </>
    )
}

export default GuestTopBarComponent
