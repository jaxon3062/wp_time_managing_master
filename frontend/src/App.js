import styled from "styled-components";
import MainPage from "./containers/MainPage.js";
import StudyPage from "./containers/StudyPage.js";
import SignIn from "./containers/SignIn.js";
import useManage from "./containers/hooks/useManage";
import "./App.css";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

function App() {
  const { signedIn, ifStartCounting } = useManage();

  return (
    <Wrapper>
      {signedIn ? <SignIn /> : ifStartCounting ? <StudyPage /> : <MainPage />}
    </Wrapper>
  );
}

export default App;
