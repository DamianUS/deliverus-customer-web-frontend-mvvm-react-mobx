import React, {ReactNode} from "react";
import TopBarTemplate from "./TopBarTemplate";
import {Avatar, Button} from "antd";
import inversifyContainer from "../../../../config/inversify.config";
import GlobalState from "../../../../viewmodel/GlobalState";
import {observer} from "mobx-react-lite";
import {UserOutlined} from "@ant-design/icons";

const LoggedInTopBar = observer(() => {
    const [globalState] = React.useState(inversifyContainer.get<GlobalState>("GlobalState"))
    return (
        <>
            <TopBarTemplate>
                <div className="flex justify-end pt-3">
                    <Avatar size="large" icon={<UserOutlined />} />
                </div>
            </TopBarTemplate>
        </>
    )
});
export default LoggedInTopBar
