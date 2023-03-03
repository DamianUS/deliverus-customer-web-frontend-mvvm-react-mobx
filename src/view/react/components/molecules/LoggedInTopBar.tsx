import React, {ReactNode} from "react";
import TopBarTemplate from "./TopBarTemplate";
import {Button} from "antd";
import LoginModal from "../organisms/auth/LoginModal";

type Props = {
    children: ReactNode|undefined
}
function LoggedInTopBar () {

    return (
        <>
            <TopBarTemplate>
                <div className="flex justify-end pt-3">
                    <Button type="primary" size="large" onClick={toggleModalVisibility}>Sign in</Button>
                </div>
            </TopBarTemplate>
        </>
    )
}

export default LoggedInTopBar
