import { Space, Button, Tag, message} from 'antd'
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

// Button = styled.button`
//   display: inline-block;
//   color: blue;
//   font-size: 5em;
//   margin: 1em;
//   padding: 0.25em 1em;
//   border: 2px solid palevioletred;
//   border-radius: 3px;
//   display: block;
// `;

const Register = ({signedIn, name, setName, onRegister, onLogin, setSignedIn}) => {
    return (
        <>
        <div>
            <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
                <AccountCircle />
            </Grid>
            <Grid item>
                <TextField 
                id="input-with-icon-grid" 
                label="Enter a name as Id" 
                size="medium"
                onChange={(e) => setName(e.target.value)}
                />
            </Grid>
            </Grid>
        </div>
        
        {/* <Input
            size="large"
            style={{ width: 300, height: 40, marginTop: 60 }}
            prefix={<UserOutlined />}
            placeholder="enter your name"
            // value={me}
            onChange={(e) => setName(e.target.value)}
            // enterButton="Become master"
            // onSearch={(name) => onLogin(name)}
        /> */}
        <Space direction="horizontal">
            <Button
                shape="round"
                type="primary"
                style={{ width: 80, margin: 10, height: 35 , background: "#0000b3"}}
                onClick={() => {
                    onLogin(name);
                    setSignedIn(!signedIn);
                }
                }
            >
                register
            </Button>
            <Button
                shape="round"
                type="primary"
                style={{ width: 80, margin: 10, height: 35 , background: "#0000b3"}}
                onClick={() => {
                    onRegister(name) 
                    setSignedIn(!signedIn)
                }
                }
            >
                login
            </Button>
        </Space>
        

        </>
        
    );
}

export default Register
