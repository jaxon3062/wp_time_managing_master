import { useState } from "react";
import { Divider } from "antd";
import { useManage } from "./hooks/useManage.js";
import styled from "styled-components";
import React from "react";
import Header from "../components/Header";
import SelectTime from "../components/MainPage/SelectTime";
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
  const { called, loading, error } = useManage();

  const [friendName, setFriendName] = useState("");

  if (called && loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>Error :(</p>;
  }

  return (
    <Wrapper>
      <Header />
      <Divider>choose how long you want to study</Divider>
      <SelectTime />
      <br></br>
      <AddFriend
        friendName={friendName}
        setFriendName={setFriendName}
      ></AddFriend>
    </Wrapper>
  );
};

export default MainPage;
