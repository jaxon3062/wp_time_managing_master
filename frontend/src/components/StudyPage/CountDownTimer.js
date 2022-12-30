import styled from 'styled-components';
import { Space, Button, Tag, message, Input, Divider, Statistic} from 'antd'
import TextField from '@material-ui/core/TextField';

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

const { Countdown } = Statistic;

const CountDownTimer = ({studyTime, ifStartCounting, setIfStartCounting, onFinish, subjectToStudy}) => {
    const toMilliseconds = (hrs,min,sec) => (hrs*60*60+min*60+sec*1)*1000;
    const timeParts = studyTime.split(":");
    let timeUserPickInMillisec = toMilliseconds(timeParts[0], timeParts[1], timeParts[2])
    let finalValueOfCountDown = Date.now() + timeUserPickInMillisec

    return (
    <Wrapper>
        {/* <Typography>
            {subjectToStudy? `${subjectToStudy}`: ""}
        </Typography> */}
        <TextField
          id="filled-read-only-input"
          label="subject"
          defaultValue={subjectToStudy}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
          color="primary"
          focused
          style={{ width: 120, marginRight: 30 }}
        />
        <Countdown title="Countdown" value={finalValueOfCountDown} onFinish={onFinish}></Countdown>
    </Wrapper>
    );
};

export default CountDownTimer;