import React, {ReactNode} from "react";
import TopBarTemplate from "./TopBarTemplate";
import {Button} from "antd";
import LoginModal from "../organisms/LoginModal";

function GuestTopBar () {

    const [showModal, setShowModal] = React.useState(false)
    const toggleModalVisibility = () => {
        setShowModal(!showModal);
    }

    return (
        <>
            <LoginModal visible={showModal} onClose={toggleModalVisibility}></LoginModal>
            <TopBarTemplate>
                <div className="flex justify-end pt-3">
                    <Button type="primary" size="large" onClick={toggleModalVisibility}>Sign in</Button>
                </div>
            </TopBarTemplate>
        </>
    )
}

export default GuestTopBar
