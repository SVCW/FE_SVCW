import React from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../firebase';
import { history } from '../../App';
import Test from '../../socimo-html-files/Test';
import { useState } from 'react';
export default function Login (props) {
    const [test, setTest] = useState(1)
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {

            console.log(result);
            props.history.push('/home')
            // console.log(result);
            // console.log(result.user.accessToken);
            // axios({
            //     url: 'https://old-stuff-exchange.azurewebsites.net/api/users/login',
            //     method: 'POST',
            //     data: {
            //         token: result.user.accessToken,
            //     }
            // }).then((value) => {
            //     console.log(value);
            // })

            // console.log(result.user.accessToken);
            // localStorage.setItem('a', result.user.displayName);
            // localStorage.setItem('userlogin', result.user.email);
            // // console.log(result.user.displayName);
            // // <Redirect to="/admin/dashboard" />

            // props.history.push("/home");

        })
            .catch((error) => {
                console.log(error);
            })
            .then(() =>
                setTimeout(() => {
                    props.history.push("/home");
                }, 3000)
            );



    }
    return (
        <div className="theme-layout">
            <div className="authtication bluesh high-opacity">
                <div className="bg-image" style={{ backgroundImage: 'url(images/resources/login-bg3.jpg)' }} />
                <ul className="welcome-caro">
                    <li className="welcome-box">
                        <figure><img src="images/resources/login-1.png" alt /></figure>
                        <h4>Ask questions with seniors Researchers</h4>
                        <p>
                            Ask questions and get the experienced answer by researchers and others fellows.
                        </p>
                    </li>
                    <li className="welcome-box">
                        <figure><img src="images/resources/login-2.png" alt /></figure>
                        <h4>Find New Researchers or Friends</h4>
                        <p>
                            Join Socimo and make your network of university or college fellows.
                        </p>
                    </li>
                    <li className="welcome-box">
                        <figure><img src="images/resources/login-3.png" alt /></figure>
                        <h4>Sell Your Online paid Content</h4>
                        <p>
                            Sell your online lectures, videos, books and many more with Socimo.
                        </p>
                    </li>
                </ul>
            </div>
            <div className="auth-login">
                <div className="logo"><img src="images/logo.png" alt /><span>Socimo</span></div>
                <div className="mockup left-bottom"><img src="images/mockup.png" alt /></div>
                <div className="verticle-center">
                    <div className="login-form">
                        <h4><i className="icofont-key-hole" /> Login</h4>
                        <form method="post" className="c-form">
                            <input type="text" placeholder="User Name @" />
                            <input type="password" placeholder="xxxxxxxxxx" />
                            <div className="checkbox">
                                <input type="checkbox" id="checkbox" defaultChecked />
                                <label htmlFor="checkbox"><span>Remember Me</span></label>
                            </div>
                            <button className="main-btn" type="submit"><i className="icofont-key" /> Login</button>
                            <p
                                style={{
                                    marginTop: 20,
                                    fontSize: 16,
                                    borderBottom: "2px solid #17a2b8",
                                    paddingBottom: 4,
                                    width: "max-content",
                                    cursor: "pointer",
                                }}
                                onClick={signInWithGoogle}
                            >

                                Đăng nhập với Google
                            </p>
                        </form>
                    </div>
                </div>
                <div className="mockup right"><img src="images/star-shape.png" alt /></div>
            </div>
            {test === 1 ? <div></div> : <Test />}
        </div>

    )
}
