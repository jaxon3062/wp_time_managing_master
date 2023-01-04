import styled from 'styled-components';
import { Space, Card, List, Divider, Input} from 'antd'
import { useState, useEffect, useRef, useContext} from "react";
import { TimePicker } from 'antd';
import { CaretRightOutlined, UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { CardContent } from '@material-ui/core';
import { Typography } from 'antd';
const { Title } = Typography;

const Wrapper = styled.section`
display: flex;
align-items: center;
justify-content: center;
flex-direction: row;
`;

const data = [
    {
      title: 'Title 1',
    },
    {
      title: 'Title 2',
    },
    {
      title: 'Title 3',
    },
    {
      title: 'Title 4',
    },
    {
      title: 'Title 5',
    },
    {
      title: 'Title 6',
    },
    {
    title: 'Title 7',
    },
    {
        title: 'Title 8',
      },
      {
      title: 'Title 9',
      },
  ];

const StudyingFriendsList = ({}) => {

  return (
    <Wrapper>
      
        
        <div
        style={{
          width: 660,
          height: 300,
          overflowY: 'scroll',
          overflowX: 'hidden'
        }}
        >
          <List
              grid={{
              gutter: 6,
              column: 3
              }}
              style={{margin: 3}}
              bordered
              dataSource={data}
              renderItem={(item) => (
              <List.Item>
                  <Card title={item.title} style={{ width: 160, marginTop: 10}}>Card content</Card>
              </List.Item>
              )}
          />
        </div>
        
    </Wrapper>
  );
};

export default StudyingFriendsList;