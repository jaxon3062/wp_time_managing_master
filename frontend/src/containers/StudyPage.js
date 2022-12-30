import { useState, useEffect, useRef } from "react";
import { Button, Input, Tag, message, Tabs, Avatar, AutoComplete} from 'antd'
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

const Wrapper = styled.div`
  width: 1460px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const StudyPage = () => {
  const { studyTime, ifStartCounting, setIfStartCounting, onFinish, subjectToStudy, setSubjectToStudy} = useManage();
  
  return (
    <Wrapper>
        <Header />
        <CountDownTimer studyTime={studyTime} ifStartCounting={ifStartCounting} setIfStartCounting={setIfStartCounting} 
                        onFinish={onFinish}   subjectToStudy={subjectToStudy}/> 
        <br></br>
        <br></br>
        <Divider>Friends online</Divider>
        <br></br>
        <StudyingFriendsList/>
   </Wrapper>
  );
}
  
export default StudyPage;