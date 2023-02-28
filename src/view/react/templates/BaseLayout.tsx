import { observer } from "mobx-react-lite"
import { Layout, Space, Spin } from 'antd';
import React, {ReactNode} from "react";
import GuestTopBarComponent from "../components/molecules/GuestTopBarComponent";
import inversifyContainer from "../../../config/inversify.config";
import GlobalState from "../../../viewmodel/GlobalState";
const { Header, Content, Footer } = Layout;

type Props = {
    children?: ReactNode,
    topBar?: ReactNode,
    footer?: ReactNode,
}

const BaseLayout = observer((props: Props) => {
    const [globalState] = React.useState(inversifyContainer.get<GlobalState>("GlobalState"))
    return (
        <Layout>
            <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
                {props.topBar ?? <GuestTopBarComponent></GuestTopBarComponent>}
            </Header>
            <Content>
                {globalState.loading && <Space size="middle"><Spin size="large" /></Space>}
                {props.children ?? 'Default content'}
            </Content>
            <Footer>{props.footer ?? 'Default footer'}</Footer>
        </Layout>
    );
});
export default BaseLayout
