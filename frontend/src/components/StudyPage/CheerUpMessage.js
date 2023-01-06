import styled from "styled-components";
import { Input, List } from "antd";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import dayjs from "dayjs";
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

const CheerUpMessage = () => {
  const { name, me, cheerUpMessage, setCheerUpMessage, onSendMessage } =
    useManage();

  const classes = useStyles();
  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Card className={classes.root}>
          <CardContent>
            <Input.Search
              size="large"
              style={{ width: 500, margin: 10 }}
              placeholder="Cheer up for your friends "
              showCount
              maxLength={30}
              value={cheerUpMessage}
              onChange={(e) => setCheerUpMessage(e.target.value)}
              enterButton="Send"
              onSearch={() => {
                onSendMessage({
                  variables: {
                    name: name,
                    context: cheerUpMessage,
                  },
                  onError: (err) => {
                    console.error(err);
                  },
                });
                setCheerUpMessage("");
              }}
            />
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
                // style={{ overflow: 'auto' }}
                size="small"
                bordered
                dataSource={me.friends.filter((fr) => fr.status !== "OFFLINE")}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.name}
                      description={`${item.status}: ${item.message}`}
                    />
                  </List.Item>
                )}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </Wrapper>
  );
};

export default CheerUpMessage;
