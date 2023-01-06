import { Space } from "antd";
import { Divider } from "antd";
import styled from "styled-components";
import React from "react";
import Header from "../components/Header";
import CountDownTimer from "../components/StudyPage/CountDownTimer.js";
import StudyingFriendsList from "../components/StudyPage/StudyingFriendsList.js";
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
  return (
    <Wrapper>
      <Header />
      <CountDownTimer />
      <br></br>
      <br></br>
      <Divider>Friends online</Divider>
      <br></br>
      <Space
        direction="horizontal"
        align="center"
        style={{ width: "100%", justifyContent: "center" }}
      >
        <StudyingFriendsList />
        <Divider type="vertical" />
        <CheerUpMessage />
      </Space>
    </Wrapper>
  );
};

export default StudyPage;
