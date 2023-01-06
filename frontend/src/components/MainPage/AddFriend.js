import styled from "styled-components";
import { Space, Button, Input, Divider, List, Badge } from "antd";

import TextField from "@material-ui/core/TextField";
import { UserOutlined } from "@ant-design/icons";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "antd";

import { useManage } from "../../containers/hooks/useManage.js";

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

const AddFriend = ({ friendName, setFriendName }) => {
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
    loading,
  } = useManage();

  if (loading || !me) {
    return <p>Loading...</p>;
  }

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
                onClick={() => {
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
                  });
                  setFriendName("");
                }}
              >
                Add
              </Button>
              <Button
                shape="round"
                type="primary"
                style={{ width: 80, height: 35, background: "#0000b3" }}
                onClick={() => {
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
                  });
                  setFriendName("");
                }}
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
              <Badge count={me.friendRequest.length}>
                <TextField
                  id="filled-read-only-input"
                  label="friend confirm"
                  // defaultValue is for friendRequest[0]
                  value={
                    me.friendRequest.length !== 0
                      ? me.friendRequest[0].name
                      : ""
                  }
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
                  if (!me.friendRequest[0]) {
                    console.error("Friend request is empty");
                    return;
                  }
                  onAcceptFriend({
                    variables: {
                      name,
                      friendName: me.friendRequest[0].name,
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
                  if (!me.friendRequest[0]) {
                    console.error("Friend request is empty");
                    return;
                  }
                  onRejectFriend({
                    variables: {
                      name,
                      friendName: me.friendRequest[0].name,
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
                dataSource={me.friends}
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
