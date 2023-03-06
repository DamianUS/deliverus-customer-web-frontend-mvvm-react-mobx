import React, {ReactNode} from "react";
import TopBarTemplate from "./TopBarTemplate";
import {Button, Menu, MenuProps, Popover, Typography} from "antd";
import inversifyContainer from "../../../../config/inversify.config";
import {observer} from "mobx-react-lite";
import {LogoutOutlined, UserOutlined} from "@ant-design/icons";
import LogoutViewModel from "../../../../viewmodel/authentication/LogoutViewModel";
import {useNavigate} from "react-router-dom";

const {Text} = Typography;

const LoggedInTopBar = observer(() => {
    const [logoutViewModel] = React.useState(inversifyContainer.get<LogoutViewModel>("LogoutViewModel"))
    const navigate = useNavigate();

    const items: MenuProps['items'] = [
        {
            label: 'Logout',
            key: 'logout',
            icon: <LogoutOutlined />,
        },
    ];

    const onClick: MenuProps['onClick'] = async (e) => {
        if(e.key === "logout"){
            await logoutViewModel.logout()
            return navigate("/");
        }
    };

    return (
        <>
            <TopBarTemplate>
                <div className="flex justify-end pt-3">
                    <Popover
                        title={logoutViewModel.globalState.loggedInUser?.firstName}
                        getPopupContainer={trigger => trigger.parentElement as HTMLElement}
                        placement="bottomLeft"
                        content={
                            <Menu
                                onClick={onClick}
                                style={{ width: 256 }}
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                mode="inline"
                                items={items}
                            />
                        }
                        trigger="click">
                        <Button size="large" shape="circle" icon={<UserOutlined />} />
                    </Popover>
                </div>
            </TopBarTemplate>
        </>
    )
});
export default LoggedInTopBar
