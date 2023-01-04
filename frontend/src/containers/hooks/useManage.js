import { useState, useEffect, useRef, useContext} from "react";
import { Button, Input, Tag, message} from 'antd'
import React from "react";
import { USER_QUERY } from "../../graphql/index";
import { useQuery, useMutation } from "@apollo/client";

const ManageContext = React.createContext({
    name:"",
    signedIn: true,
    ifStartCounting: false,
    studyTime: null
});

const ManageProvider = (props) => {
    const [signedIn, setSignedIn] = useState(true);
    const [ifStartCounting, setIfStartCounting] = useState(false);
    const [name, setName] = useState();
    const [studyTime, setStudyTime] = useState(null);
    const [subjectToStudy, setSubjectToStudy] = useState();
    const [cheerUpMessage, setCheerUpMessage] = useState();
    const [password, setPassword] = useState("");
    const { loading, error, data } = useQuery(USER_QUERY);

    const onFinish = () => {
        //function for StudyPage countdownTimer finish countdown
    };
    const onSendMessage = () => {
        //function for StudyPage countdownTimer finish countdown
    };

    return (
    <ManageContext.Provider
        value={{
            signedIn, setSignedIn, name, setName, studyTime, setStudyTime, 
            ifStartCounting, setIfStartCounting, onFinish, subjectToStudy, setSubjectToStudy,
            cheerUpMessage, setCheerUpMessage, onSendMessage, password, setPassword
        }}
        {...props}
    />
    );
};

const useManage = () => useContext(ManageContext);
export { ManageProvider, useManage };
    

// const useManage = () => {
//     const [signedIn, setSignedIn] = useState(false);
//     const [name, setName] = useState();


//     return {
//         signedIn, setSignedIn, name, setName
//     };

// }

export default useManage