import { useState, useEffect, useRef } from "react";
import { Space, Button, Input, Tag, message, Tabs, Avatar, AutoComplete} from 'antd'
import { Divider } from 'antd';
import {useManage} from './hooks/useManage.js'
import styled from "styled-components";
import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import Header from '../components/Header';
import SelectTime from '../components/MainPage/SelectTime';
import AddFriend from "../components/MainPage/AddFriend.js";
import CountDownTimer from "../components/StudyPage/CountDownTimer.js";
import StudyingFriendsList from "../components/StudyPage/StudyingFriendsList.js"
import CheerUpMessage from "../components/StudyPage/CheerUpMessage.js";

const Wrapper = styled.div`
  width: 1460px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const StudyPage = () => {
  const { name, studyTime, ifStartCounting, setIfStartCounting, onFinish, subjectToStudy, setSubjectToStudy,
          cheerUpMessage, setCheerUpMessage, onSendMessage} = useManage();
  
  return (
    <Wrapper>
        <Header />
        <CountDownTimer studyTime={studyTime} ifStartCounting={ifStartCounting} setIfStartCounting={setIfStartCounting} 
                        onFinish={onFinish}   subjectToStudy={subjectToStudy}/> 
        <br></br>
        <br></br>
        <Divider>Friends online</Divider>
        <br></br>
        <Space  direction="horizontal" align="center" style={{width: '100%', justifyContent: 'center'}}>
          <StudyingFriendsList />
          <Divider type="vertical" />
          <CheerUpMessage />

        </Space>
        
   </Wrapper>
  );
}
  
export default StudyPage;