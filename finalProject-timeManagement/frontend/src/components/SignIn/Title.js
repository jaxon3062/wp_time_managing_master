import styled from "styled-components";
import { Button, Input, Tag, message} from 'antd'
import { ClockCircleOutlined } from "@ant-design/icons";



const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
h1 {
margin: 0;
margin-top:-120px;
margin-right: 20px;
font-size: 2.5em;
}`;

const AppTitle = ({name}) => (
    // <Wrapper><h1>{name? `${name}'s `: "My"}
    // Chat Room</h1></Wrapper>
    <Wrapper>
        <h1>
        Time manage master
        </h1>
        <h1>
        <ClockCircleOutlined />
        </h1>
    </Wrapper>
);

export default AppTitle
