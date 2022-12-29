import styled from 'styled-components';
import { Space, Button, Tag, message, Input, Divider} from 'antd'
import Typography from '@material-ui/core/Typography';
import { useState, useEffect, useRef, useContext} from "react";
import { TimePicker } from 'antd';
import { CaretRightOutlined, UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const Wrapper = styled.section`
display: flex;
align-items: center;
justify-content: center;
flex-direction: row;

`;

const SelectTime = ({studyTime, setStudyTime, ifStartCounting, setIfStartCounting}) => {
    
    return (
    <Wrapper>
        <Space style={{width: '100%', justifyContent: 'center'}}>
            <TimePicker 
                onChange={(time, timeString) => {
                    console.log(time, timeString);
                    let test = dayjs(time);
                    console.log("test", test.format());
                    setStudyTime(timeString);
                }} 
                size="large" 
                showNow={false} />
            <Button
                shape="circle"
                type="primary"
                icon={<CaretRightOutlined />}
                style={{ margin: 10 }}
                onClick={() => {
                    setIfStartCounting(!ifStartCounting)
                    console.log(studyTime)
                }
                }
            >
            </Button>
        </Space>
       
    </Wrapper>
    );
};

export default SelectTime;