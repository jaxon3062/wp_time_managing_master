import styled from "styled-components";
import { Space, Button, Tag, message, Input, Divider } from "antd";
// import Typography from '@material-ui/core/Typography';
import { useState, useEffect, useRef, useContext } from "react";
import { TimePicker } from "antd";
import { CaretRightOutlined, UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";

import { useManage } from "../../containers/hooks/useManage.js";

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const SelectTime = () => {
  const {
    studyTime,
    setStudyTime,
    ifStartCounting,
    setIfStartCounting,
    setSubjectToStudy,
    subjectToStudy,
    onStart,
  } = useManage();

  return (
    <Wrapper>
      <Space style={{ width: "100%", justifyContent: "center" }}>
        <TextField
          id="standard-basic"
          label="subject to study"
          variant="standard"
          style={{ marginBottom: 15 }}
          onChange={(e) => setSubjectToStudy(e.target.value)}
        />
        <TimePicker
          onChange={(time, timeString) => {
            console.log(time, timeString);
            let test = dayjs(time);
            console.log("test", test.format());
            setStudyTime(timeString);
          }}
          size="large"
          showNow={false}
        />
        <Button
          shape="circle"
          type="primary"
          icon={<CaretRightOutlined />}
          style={{ margin: 10 }}
          onClick={() => {
            //need if-else for not filling textfield and picking time
            setIfStartCounting(!ifStartCounting);
            console.log(subjectToStudy);
            onStart();
          }}
        ></Button>
      </Space>
    </Wrapper>
  );
};

export default SelectTime;
