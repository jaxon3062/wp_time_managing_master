import styled from "styled-components";
import { Space, Button, Tag, message, Input, Divider, List, Badge } from "antd";
// import Typography from '@material-ui/core/Typography';
import { useState, useEffect, useRef, useContext } from "react";
import { TimePicker } from "antd";
import TextField from "@material-ui/core/TextField";
import { CaretRightOutlined, UserOutlined } from "@ant-design/icons";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "antd";

import { useQuery, useMutation } from "@apollo/client";
import { useManage } from "../../containers/hooks/useManage.js";
import { genComponentStyleHook } from "antd/es/theme/internal.js";

const { Title } = Typography;

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;


const useStyles = makeStyles({
  root: {
    minWidth: 320,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const AddFriend = ({
  friendName,
  setFriendName,
}) => {
  const classes = useStyles();
  const {
    name,
    me,
    onAddFriend,
    onAcceptFriend,
    onRejectFriend,
    onRemoveFriend,
    errMsg,
    setErrMsg,
  } = useManage();
  console.log(me);
  const { friends, friendRequest } = me;
  console.log(friends, friendRequest);

  return (
    <Wrapper>
      <Space
        direction="horizontal"
        align="center"
        style={{ width: "100%", justifyContent: "center" }}
      >
        <Card className={classes.root}>
          <CardContent>
            <Space style={{ width: "100%", justifyContent: "center" }}>
              <Input
                size="large"
                style={{ width: 270, height: 40, marginTop: 15 }}
                prefix={<UserOutlined />}
                placeholder="add or delete a friend"
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                // enterButton="Become master"
                // onSearch={(name) => onLogin(name)}
              />
            </Space>
          </CardContent>
          {errMsg ? <div>{errMsg}</div> : <></>}
          <CardActions>
            <Space
              direction="horizontal"
              align="center"
              split={<Divider type="vertical" />}
              style={{ width: "100%", justifyContent: "center" }}
            >
              <Button
                shape="round"
                type="primary"
                style={{ width: 80, height: 35, background: "#0000b3" }}
                onClick={() =>
                  onAddFriend({
                    variables: {
                      name,
                      friendName,
                    },
                    onError: (err) => {
                      if (err.message === "USER_NOT_FOUND") {
                        setErrMsg(`The user ${friendName} doesn't exist!`);
                      } else {
                        setErrMsg("Error: " + err.message);
                      }
                    },
                    onCompleted: () => {
                      setErrMsg("");
                    },
                  })
                }
              >
                Add
              </Button>
              <Button
                shape="round"
                type="primary"
                style={{ width: 80, height: 35, background: "#0000b3" }}
                onClick={() =>
                  onRemoveFriend({
                    variables: {
                      name,
                      friendName,
                    },
                    onError: (err) => {
                      if (err.message === "USER_NOT_FOUND") {
                        setErrMsg(`The user ${friendName} doesn't exist!`);
                      } else {
                        setErrMsg("Error: " + err.message);
                      }
                    },
                    onCompleted: () => {
                      setErrMsg("");
                    },
                  })
                }
              >
                Delete
              </Button>
            </Space>
          </CardActions>
          <Divider></Divider>
          {/* <Space style={{width: '100%', justifyContent: 'center'}}>
                
            </Space> */}
          <CardContent>
            <Space style={{ width: "100%", justifyContent: "center" }}>
              {/* Badge count is for how much friendrequest are left */}
              <Badge count={friendRequest.length}>
                <TextField
                  id="filled-read-only-input"
                  label="friend confirm"
                  // defaultValue is for friendRequest[0]
                  value={friendRequest.length !== 0 ? friendRequest[0].name : ""}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  color="primary"
                  focused
                  style={{ width: 160, marginTop: -15 }}
                />
              </Badge>
            </Space>
          </CardContent>
          <CardActions>
            <Space
              direction="horizontal"
              align="center"
              split={<Divider type="vertical" />}
              style={{
                width: "100%",
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              <Button
                shape="round"
                type="primary"
                style={{ width: 80, height: 35, background: "#0000b3" }}
                onClick={() => {
                  if (!friendRequest[0]) {
                    console.error("Friend request is empty");
                    return;
                  }
                  onAcceptFriend({
                    variables: {
                      name,
                      friendName: friendRequest[0].name,
                    },
                    onError: (err) => {
                      console.error("Error: " + err.message);
                    },
                  });
                }}
              >
                Accept
              </Button>
              <Button
                shape="round"
                type="primary"
                style={{ width: 80, height: 35, background: "#0000b3" }}
                onClick={() => {
                  if (!friendRequest[0]) {
                    console.error("Friend request is empty");
                    return;
                  }
                  onRejectFriend({
                    variables: {
                      name,
                      friendName: friendRequest[0].name,
                    },
                    onError: (err) => {
                      console.error("Error: " + err.message);
                    },
                  });
                }}
              >
                Reject
              </Button>
            </Space>
          </CardActions>
        </Card>

        {/* friends list's card */}
        <Card className={classes.root}>
          <CardContent>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Title level={4} style={{ marginTop: -5 }}>
                Friends list
              </Title>
            </div>

            <div
              style={{
                height: 250,
                overflow: "auto",
              }}
            >
              <List
                style={{ overflow: "auto" }}
                size="small"
                bordered
                dataSource={friends}
                renderItem={(item) => <List.Item>{item.name}</List.Item>}
              />
            </div>
          </CardContent>
        </Card>
      </Space>
    </Wrapper>
  );
};

export default AddFriend;
