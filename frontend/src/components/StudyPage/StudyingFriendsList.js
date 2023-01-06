import styled from "styled-components";
import { Card, List } from "antd";
import dayjs from "dayjs";

import { useManage } from "../../containers/hooks/useManage.js";

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const StudyingFriendsList = () => {
  const { me } = useManage();

  return (
    <Wrapper>
      <div
        style={{
          width: 660,
          height: 300,
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        {/*<div>Friends studying</div>*/}
        <List
          grid={{
            gutter: 6,
            column: 3,
          }}
          style={{ margin: 3 }}
          bordered
          dataSource={me.friends.filter((fr) => fr.status === "STUDY")}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.name} style={{ width: 160, marginTop: 10 }}>
                {item.content}
              </Card>
            </List.Item>
          )}
        />
      </div>
    </Wrapper>
  );
};

export default StudyingFriendsList;
