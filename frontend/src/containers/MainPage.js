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


const Wrapper = styled.div`
  width: 1460px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const MainPage = () => {
  const { name, setName, signedIn, setSignedIn, studyTime, setStudyTime, 
          ifStartCounting, setIfStartCounting, subjectToStudy, setSubjectToStudy} = useManage();
  
  return (
    <Wrapper>
        <Header />
        <Divider>choose how long you want to study</Divider>
        <SelectTime studyTime={studyTime} setStudyTime={setStudyTime} 
                    ifStartCounting={ifStartCounting} setIfStartCounting={setIfStartCounting}
                    subjectToStudy={subjectToStudy} setSubjectToStudy={setSubjectToStudy}/>
        <br></br>
        <AddFriend></AddFriend>
    </Wrapper>
  );
}
  
export default MainPage;