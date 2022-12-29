import styled from 'styled-components';
import { Space, Card, List} from 'antd'
import Typography from '@material-ui/core/Typography';
import { useState, useEffect, useRef, useContext} from "react";
import { TimePicker } from 'antd';
import { CaretRightOutlined, UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

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

const StudyingFriendsList = ({studyTime, ifStartCounting, setIfStartCounting, onFinish}) => {

    return (
    <Wrapper>
        <div
            style={{
                width: 1000,
                height: 300,
                overflow: 'auto'
            }}
        >
            <List
                grid={{
                gutter: 16,
                column: 4
                }}
                dataSource={data}
                renderItem={(item) => (
                <List.Item>
                    <Card title={item.title} style={{width: 200}}>Card content</Card>
                </List.Item>
                )}
            />
        </div>
    </Wrapper>
    );
};

export default StudyingFriendsList;