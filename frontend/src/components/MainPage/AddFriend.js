import styled from 'styled-components';
import { Space, Button, Tag, message, Input, Divider, List, Badge} from 'antd'
// import Typography from '@material-ui/core/Typography';
import { useState, useEffect, useRef, useContext} from "react";
import { TimePicker } from 'antd';
import TextField from '@material-ui/core/TextField';
import { CaretRightOutlined, UserOutlined } from "@ant-design/icons";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from 'antd';
const { Title } = Typography;

const Wrapper = styled.section`
display: flex;
align-items: center;
justify-content: center;
flex-direction: row;

`;
const data = [
    'name1',
    'name2',
    'name3',
    'name4',
    'name5',
    'name6',
    'name7',
    'name8',
];

const useStyles = makeStyles({
    root: {
      minWidth: 320,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
});

const AddFriend = ({setName}) => {
    const classes = useStyles();
    return (
    <Wrapper>
        <Space  direction="horizontal" align="center" style={{width: '100%', justifyContent: 'center'}}>
        <Card className={classes.root}>
            <CardContent >
                <Space style={{width: '100%', justifyContent: 'center'}}>
                    <Input 
                        size="large"
                        style={{ width: 270, height: 40, marginTop: 15 }}
                        prefix={<UserOutlined />}
                        placeholder="add or delete a friend"
                        // value={me}
                        onChange={(e) => setName(e.target.value)}
                        // enterButton="Become master"
                        // onSearch={(name) => onLogin(name)}
                    />
                </Space>
            </CardContent>
            <CardActions >
                <Space direction="horizontal" align="center" split={<Divider type="vertical" />} style={{width: '100%', justifyContent: 'center'}}>
                    <Button
                        shape="round"
                        type="primary"
                        style={{ width: 80, height: 35 , background: "#0000b3"}}
                        onClick={() => {
                        }
                        }
                    >
                        add
                    </Button>
                    <Button
                        shape="round"
                        type="primary"
                        style={{ width: 80,  height: 35 , background: "#0000b3"}}
                        onClick={() => {
                        }
                        }
                    >
                        delete
                    </Button>
                </Space>
            </CardActions>
            <Divider></Divider>
            {/* <Space style={{width: '100%', justifyContent: 'center'}}>
                
            </Space> */}
            <CardContent >
                <Space style={{width: '100%', justifyContent: 'center'}}>
                    {/* Badge count is for how much friendrequest are left */}
                    <Badge count={5}>
                        <TextField
                            id="filled-read-only-input"
                            label="friend confirm"
                            // defaultValue is for friendRequest[0]
                            defaultValue={'friend 1'}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                            color="primary"
                            focused
                            style={{ width: 160, marginTop: -15}}
                        />
                    </Badge>
                </Space>
            </CardContent>
            <CardActions>
                <Space direction="horizontal" align="center" split={<Divider type="vertical" />} style={{width: '100%', justifyContent: 'center', marginBottom: 12}}>
                    <Button
                        shape="round"
                        type="primary"
                        style={{ width: 80, height: 35 , background: "#0000b3"}}
                        onClick={() => {
                        }
                        }
                    >
                        accept
                    </Button>
                    <Button
                        shape="round"
                        type="primary"
                        style={{ width: 80,  height: 35 , background: "#0000b3"}}
                        onClick={() => {
                        }
                        }
                    >
                        reject
                    </Button>
                </Space>
            </CardActions>
        </Card>

        {/* friends list's card */}
        <Card className={classes.root}>
            <CardContent>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Title level={4} style={{ marginTop: -5 }}>
                    Friends list
                </Title>
                </div>
            
                <div
                    style={{
                        height: 250,
                        overflow: 'auto'
                    }}
                >
                    <List
                    style={{ overflow: 'auto' }}
                    size="small"
                    bordered
                    dataSource={data}
                    renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                </div>
                
            </CardContent>
        </Card>
        </Space>
        
        
    </Wrapper>
    );
};

export default AddFriend;