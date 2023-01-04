import AppTitle from '../components/SignIn/Title.js'
import Register from '../components/SignIn/Register.js'
import {useManage} from './hooks/useManage.js'



const SignIn = () => {
    const { name, setName, signedIn, setSignedIn, password, setPassword } = useManage();
    // const handleLogin = (name) => {
    // if (!name){
    //     displayStatus({
    //         type: "error",
    //         msg: "Missing user name",
    //     });
    // } else {
    //     SignInNewUser(name)
    //     setSignedIn(true);
    // }
    // }
    const onRegister = () => {

    }
    const onLogin = () => {

    }
    return (
        <>
            <AppTitle />
            <Register signedIn={signedIn} name={name} setName={setName} onLogin={onLogin} 
                      onRegister={onRegister} setSignedIn={setSignedIn} 
                      password={password} setPassword={setPassword}/>
        </>
    );
}

export default SignIn