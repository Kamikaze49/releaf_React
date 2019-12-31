import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import $ from 'jquery'
import './login.css'
import * as firebase from 'firebase'


class Login extends Component{
    
    constructor(props) {
        super(props);

        this.state={
            email:"",
            password:"",
            username:"",
            confirmPassword:"",
            redirect:false
        }
    }

    componentDidMount(){
        $(document).ready(function(){

            var cardToggle = 0;

            $('.toggle-link').on('click', function(event){
               event.preventDefault();
                if(cardToggle == 0 ){
                    $(this).text('Login');
                    $('.login-box').animate({
                        right: '350px'
                    });
                    $('.signup-box').animate({
                        right: '0'
                    });	

                    cardToggle = 1;

                }else{
                    $(this).text('Signup');
                    $('.login-box').animate({
                        right: '0'
                    });
                    $('.signup-box').animate({
                        right: '-350px'
                    });

                    cardToggle = 0;
                }
            })
            })
    }
    
    setRedirect = () => {
        this.setState({
          redirect: true
        })
      }

    // renderRedirect = () => {
    //     if (this.state.redirect) {
    //       return 
    //     }
    //   }

    loginWithGoogle = ()=>{
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider)
    .then(this.props.login)
    .then(this.props.AuthChange)
    }

    onInput=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render(){
        return(
            <div className="container LoginDiv">
                <div class="user-card round5">
                <div class="login-box">
                    <form class="login-form" name="login" action="">
                        <input type="username" name="email" class="username" placeholder="email" onChange = {this.onInput}/>
                        <input type="password" name="password" class="password" placeholder="password" onChange = {this.onInput}/>
                        <input type="submit" name="login" value="Login" class="login" onClick={(e)=>{
                            e.preventDefault();
                            this.props.login(this.state.email,this.state.password);
                        }
                        }/>
                    </form>

                    <div class="or"></div>

                    <a onClick={this.props.google} class="login-with-google">
                        <span class="icon fa fa-google-plus"></span>
                        Login with google
                    </a>
                </div>
                <div class="signup-box">
                    <form class="signup-form" name="signup" action="">
                        <input type="username" name="username" value={this.state.username} class="username" placeholder="username" onChange = {this.onInput}/>
                        <input type="email" name="email" value={this.state.email} class="email" placeholder="email" onChange = {this.onInput}/>
                        <input type="password" name="password" value={this.state.password} class="password" placeholder="password" onChange = {this.onInput}/>
                        <input type="password" name="confirmPassword" value={this.state.confirmPassword} class="confirm-password" placeholder="confirm-password" onChange = {this.onInput}/>
                        <input type="submit" name="signup" value="Signup" class="signup" onClick={(e)=>{
                            e.preventDefault();
                            if(this.state.password == this.state.confirmPassword){
                            this.props.createAccount(this.state.email,this.state.password,this.state.username)
                                this.setState({
                                    email:"",
                                    password:"",
                                    username:"",
                                    confirmPassword:"",
                                })
                            }
                            else return(alert("Your passwords must match"))
                        }
                        }/>
                    </form>
                </div>

                {this.props.isLoggedIn&&<Redirect to='/'/>}

                <div class="footer">
                    <span>or </span><a class="toggle-link" href="#">Sign Up</a>
                </div>
            </div>
            </div>
        )
    }

}

export default Login