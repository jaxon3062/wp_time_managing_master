import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ClockCircleOutlined } from "@ant-design/icons";


const Wrapper = styled.section`
display: flex;
align-items: center;
justify-content: center;
margin: 30px;
`;

const Header = () => {
    return (
    <Wrapper>
        <Typography variant="h3">Time management master</Typography>
        <h1>
            <ClockCircleOutlined style={{ margin: 10 }}/>
        </h1>
        
    </Wrapper>
    );
};

export default Header;