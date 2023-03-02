import logo from '../../logo.svg'
import {Col, Row} from "antd";
import {ReactNode} from "react";

type Props = {
    children?: ReactNode
}
function TopBarTemplate (props?:Props) {

    return (
        <Row>
            <Col flex="90px"><img style={styles.logo} src={logo} alt="DeliverUS logo"/></Col>
            <Col flex="auto">
                {props?.children}
            </Col>
        </Row>
    )
}

const styles = {
    logo: {
        height:55,
        marginTop: 5,
        objectPosition: -5
    }
}

export default TopBarTemplate
