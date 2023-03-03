import React, {ReactNode} from "react";
import TopBarTemplate from "./TopBarTemplate";
import {Button} from "antd";
import LoginModal from "../organisms/auth/LoginModal";
import inversifyContainer from "../../../../config/inversify.config";
import TokenStorer from "../../../services/interfaces/TokenStorer";
import GlobalState from "../../../../viewmodel/GlobalState";

function GuestTopBar () {

    const tokenStorer = inversifyContainer.get<TokenStorer>("TokenStorer");
    const globalState = inversifyContainer.get<GlobalState>("GlobalState");

    const [showModal, setShowModal] = React.useState(false)

    React.useEffect(() => {
        const retrieveUserByStoredToken = async () => {
            globalState.loggedInUser = await tokenStorer.retrieve()
        };
        retrieveUserByStoredToken();
    });

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
