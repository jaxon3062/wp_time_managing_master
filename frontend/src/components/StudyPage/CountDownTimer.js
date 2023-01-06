import styled from "styled-components";
import { Modal, Button, Statistic } from "antd";
import TextField from "@material-ui/core/TextField";

import { CloseOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import dayjs from "dayjs";

import { useManage } from "../../containers/hooks/useManage.js";

const { confirm } = Modal;

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const { Countdown } = Statistic;

const CountDownTimer = () => {
  const {
    studyTime,
    ifStartCounting,
    setIfStartCounting,
    onFinish,
    subjectToStudy,
  } = useManage();
  const toMilliseconds = (hrs, min, sec) =>
    (hrs * 60 * 60 + min * 60 + sec * 1) * 1000;
  const timeParts = studyTime.split(":");
  let timeUserPickInMillisec = toMilliseconds(
    timeParts[0],
    timeParts[1],
    timeParts[2]
  );
  let finalValueOfCountDown = Date.now() + timeUserPickInMillisec;

  //extra confirm for countdown quit buttom, onClick function should put in onOK
  const showQuitConfirm = () => {
    confirm({
      title: "Are you sure to quit the study?",
      icon: <ExclamationCircleFilled />,
      //   content: 'Some descriptions',
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        //need onClick function
        setIfStartCounting(!ifStartCounting);
        onFinish();
        //console.log("OK");
      },
      onCancel() {
        //console.log("Cancel");
      },
    });
  };

  return (
    <Wrapper>
      {/* <Typography>
            {subjectToStudy? `${subjectToStudy}`: ""}
        </Typography> */}
      <TextField
        id="filled-read-only-input"
        label="subject"
        defaultValue={subjectToStudy}
        InputProps={{
          readOnly: true,
        }}
        variant="outlined"
        color="primary"
        focused
        style={{ width: 120, marginRight: 30 }}
      />
      <Countdown
        title="Countdown"
        value={finalValueOfCountDown}
        onFinish={() => {
          setIfStartCounting(!ifStartCounting);
          onFinish();
        }}
      ></Countdown>
      <Button
        shape="default"
        type="primary"
        danger
        icon={<CloseOutlined />}
        style={{ marginLeft: 20 }}
        onClick={showQuitConfirm}
      >
        Quit
      </Button>
    </Wrapper>
  );
};

export default CountDownTimer;
