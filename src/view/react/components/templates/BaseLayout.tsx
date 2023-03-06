import { observer } from "mobx-react-lite"
import {Alert, Layout, Space, Spin, Typography} from 'antd';
import React, {ReactNode} from "react";
import GuestTopBar from "../molecules/GuestTopBar";
import inversifyContainer from "../../../../config/inversify.config";
import GlobalState from "../../../../viewmodel/GlobalState";
import LoggedInTopBar from "../molecules/LoggedInTopBar";
const { Header, Content, Footer } = Layout;
const { Text } = Typography;

type Props = {
    children?: ReactNode,
    topBar?: ReactNode,
    footer?: ReactNode,
    pageTitle?: ReactNode,

}

const BaseLayout = observer((props: Props) => {
    const [globalState] = React.useState(inversifyContainer.get<GlobalState>("GlobalState"))
    return (
        <Layout>
            <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
                {props.topBar ?? (globalState.loggedInUser ? <LoggedInTopBar/> : <GuestTopBar/>)}
            </Header>
            <Content>
                <div className="dark:bg-slate-800 p-10" style={{minHeight: "90vh"}}>
                    <div className="mb-10">
                    {props.pageTitle}
                    </div>
                    {globalState.loading && <Space size="middle"><Spin size="large" /></Space>}
                    {globalState.backendError &&
                        <Alert
                            className="mb-10"
                            message="Something wrong happened."
                            description="Please, contact with the system administrator."
                            type="error"
                            showIcon
                            closable
                        />
                    }
                    {
                        props.children ?? 'Default content'
                    }
                </div>
            </Content>
            <Footer>{props.footer ?? 'Default footer'}</Footer>
        </Layout>
    );
});
export default BaseLayout
