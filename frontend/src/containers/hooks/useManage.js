import { useState, useEffect, useRef, useContext } from "react";
import { Button, Input, Tag, message } from "antd";
import React from "react";
import {
  USER_QUERY,
  LOGIN_MUTATION,
  REGISTER_MUTATION,
  ADD_FRIEND_MUTATION,
  ACCEPT_FRIEND_MUTATION,
  REJECT_FRIEND_MUTATION,
  REMOVE_FRIEND_MUTATION,
  SENDMESSAGE_MUTATION,
  STATUS_UPDATE_MUTATION,
  FRIENDUPDATED,
  FRIENDSTATUSUPDATE,
  MESSAGERECEIVED,
} from "../../graphql";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { genComponentStyleHook } from "antd/es/theme/internal";

const ManageContext = React.createContext({
  name: "",
  signedIn: true,
  ifStartCounting: false,
  studyTime: null,
});

const ManageProvider = (props) => {
  const [signedIn, setSignedIn] = useState(true);
  const [ifStartCounting, setIfStartCounting] = useState(false);
  const [name, setName] = useState("");
  const [me, setMe] = useState(null);
  const [studyTime, setStudyTime] = useState(null);
  const [subjectToStudy, setSubjectToStudy] = useState();
  const [cheerUpMessage, setCheerUpMessage] = useState();
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [onLogin] = useMutation(LOGIN_MUTATION);
  const [onRegister] = useMutation(REGISTER_MUTATION);
  const [onAddFriend] = useMutation(ADD_FRIEND_MUTATION);
  const [onAcceptFriend] = useMutation(ACCEPT_FRIEND_MUTATION);
  const [onRejectFriend] = useMutation(REJECT_FRIEND_MUTATION);
  const [onRemoveFriend] = useMutation(REMOVE_FRIEND_MUTATION);
  const [onSendMessage] = useMutation(SENDMESSAGE_MUTATION);
  const [onStatusUpdate] = useMutation(STATUS_UPDATE_MUTATION);

  const [loadUser, { data, error, loading, called, subscribeToMore }] =
    useLazyQuery(USER_QUERY);

  useEffect(() => {
    subscribeToMore({
      document: FRIENDUPDATED,
      variables: {
        name: name,
      },
      updateQuery: (prev, { subscriptionData }) => {
        //console.log("subPub", subscriptionData);
        if (!subscriptionData.data) return prev;
        const updateUser = subscriptionData.data.friendUpdate;
        return {
          findUser: {
            ...prev.findUser,
            friends: updateUser.friends,
            friendRequest: updateUser.friendRequest,
          },
        };
      },
      onError: (err) => {
        console.error(err);
      },
    });
  }, [subscribeToMore, name]);

  useEffect(() => {
    subscribeToMore({
      document: FRIENDSTATUSUPDATE,
      variables: {
        name: name,
      },
      updateQuery: (prev, { subscriptionData }) => {
        console.log("subPub", subscriptionData);
        if (!subscriptionData.data) return prev;
        const updateFriend = subscriptionData.data.friendStatusUpdate;
        return {
          findUser: {
            ...prev.findUser,
            friends: prev.findUser.friends.map((fr) =>
              fr.name === updateFriend.name ? { ...fr, ...updateFriend } : fr
            ),
          },
        };
      },
    });
  }, [subscribeToMore, name]);

  useEffect(() => {
    subscribeToMore({
      document: MESSAGERECEIVED,
      variables: {
        name: name,
      },
      updateQuery: (prev, { subscriptionData }) => {
        //console.log("subPub", subscriptionData);
        if (!subscriptionData.data) return prev;
        const sender = subscriptionData.data.messageReceived;
        return {
          findUser: {
            ...prev.findUser,
            friends: prev.findUser.friends.map((fr) =>
              (fr.name === sender.name 
              ? { ...fr, message: sender.message } 
              : fr)
            ),
          },
        };
      },
      onError: (err) => {
        console.error(err);
      },
    });
  }, [subscribeToMore, name]);

  useEffect(() => {
    //console.log("current data", data);
    if (data && data.findUser) {
      setMe(data.findUser);
    }
  }, [data]);

  const onStart = () => {
    // when start study
    onStatusUpdate({
      variables: {
        name: name,
        status: "STUDY",
        content: subjectToStudy,
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  const onFinish = () => {
    //function for StudyPage countdownTimer finish countdown
    onStatusUpdate({
      variables: {
        name: name,
        status: "ONLINE",
        content: "",
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  return (
    <ManageContext.Provider
      value={{
        signedIn,
        setSignedIn,
        name,
        setName,
        studyTime,
        setStudyTime,
        ifStartCounting,
        setIfStartCounting,
        onStart,
        onFinish,
        subjectToStudy,
        setSubjectToStudy,
        cheerUpMessage,
        setCheerUpMessage,
        onSendMessage,
        password,
        setPassword,
        onLogin,
        onRegister,
        onAddFriend,
        onAcceptFriend,
        onRejectFriend,
        onRemoveFriend,
        errMsg,
        setErrMsg,
        called,
        loading,
        error,
        data,
        me,
        setMe,
        loadUser,
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

export default useManage;
