import styled from 'styled-components';
import { Modal, Space, Button, Tag, message, Input, Divider, Statistic, List} from 'antd'
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { useState, useEffect, useRef, useContext} from "react";
import { TimePicker } from 'antd';
import { CloseOutlined, UserOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import dayjs from "dayjs";
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
    {
      title: 'Title 1',
      content: 'hihi1'
    },
    {
      title: 'Title 2',
      content: 'hihi2'
    },
    {
      title: 'Title 3',
      content: 'hihi3'
    },
    {
      title: 'Title 4',
      content: 'hihi4'
    },
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

const CheerUpMessage = ({cheerUpMessage, setCheerUpMessage, onSendMessage}) => {
    
    const classes = useStyles();
    return (
    <Wrapper>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            
            
            <Card className={classes.root}>
            <CardContent>
                <Input.Search
                size="large"
                style={{ width: 500, margin: 10 }}
                placeholder="Cheer up for your friends "
                showCount maxLength={30}
                onChange={(e) => setCheerUpMessage(e.target.value)}
                enterButton="Send"
                onSearch={() => onSendMessage(cheerUpMessage)}
                />
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
                    // style={{ overflow: 'auto' }}
                    size="small"
                    bordered
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            title={item.title}
                            description={item.content}
                          />
                        </List.Item>
                    )}
                    />
                </div>
                
            </CardContent>
            </Card>
        </div>
    </Wrapper>
    );
};

export default CheerUpMessage;