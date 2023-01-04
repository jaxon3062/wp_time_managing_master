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
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

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

const Register = ({signedIn, name, setName, onRegister, onLogin, setSignedIn, password, setPassword}) => {
    return (
        <>
        <Space  direction="vertical" align="center" style={{width: '100%', justifyContent: 'center'}}>

        </Space>
        <div style={{margin: 10}}>
            <Grid container spacing={1} alignItems="flex-end" style={{marginBottom: 10}}>
                <Grid item>
                    <AccountCircle />
                </Grid>
                <Grid item>
                    <TextField 
                    id="input-with-icon-grid" 
                    label="Account name" 
                    size="medium"
                    onChange={(e) => setName(e.target.value)}
                    />

                </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                    <AccountCircle />
                </Grid>
                <Grid item>
                    <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
            </Grid>
            
            {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">

                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={setShowPassword((show) => !show)}
                        onMouseDown={(event) => {
                            event.preventDefault();
                        }}
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
            </FormControl> */}
        </div>
        <Space direction="horizontal">
            <Button
                shape="round"
                type="primary"
                style={{ width: 80, margin: 15, height: 35 , background: "#0000b3"}}
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
                style={{ width: 80, margin: 15, height: 35 , background: "#0000b3"}}
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
