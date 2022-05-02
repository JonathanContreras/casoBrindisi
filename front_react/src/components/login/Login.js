import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { login } from "../../utils/FirebaseFiles/login.js";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { SET_LOGIN_STATE, SET_USER_INFO } from "../../redux/actions/loginActions";
// import { useUserAuth } from "../../context/UserAuthContext.js";
// import { signOut } from "firebase/auth";

export const Login = () => {
    // const pass = useRef();
    // const mail = useRef();
    const [pass, setPass] = useState(null);
    const [mail, setMail] = useState(null);
    //const [user, setUser] = useState(null);
    // console.log(useSelector((state) => state.login));
    // const [error, setError] = useState("");
    // const dispatch = useDispatch();
    // const { logIn } = useUserAuth();

    const userLogin = async () => {
        let userInfo = await login(mail, pass);
        //setUser(userInfo);
        console.log(userInfo);
        // dispatch(SET_LOGIN_STATE(true));
        // dispatch(SET_USER_INFO(userInfo));
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setError("");
    //     try {
    //         await logIn(mail, pass);
    //     } catch (err) {
    //         setError(err.message);
    //     }
    // };

    return (
        <div className="col-12 md:col-4">
            <div className="card p-fluid">
                <form action="">
                    <h5>Login</h5>
                    <div className="field">
                        <label htmlFor="email1">Email</label>
                        <InputText id="email1" type="email" onChange={(e) => setMail(e.target.value)} required />
                    </div>
                    <div className="field">
                        <label htmlFor="pass">Age</label>
                        <Password onChange={(e) => setPass(e.target.value)} toggleMask="true" required />
                    </div>
                    <div className="card">{pass !== "" && mail !== "" ? <Button label="Login" className="mr-2 mb-2" onClick={userLogin} type="submit "></Button> : <Button label="Login" className="mr-2 mb-2" disabled></Button>}</div>
                </form>
            </div>
        </div>
    );
};
