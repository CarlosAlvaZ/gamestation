import '../styles/login.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [ userData, setUserData ] = useState({userName: "", password: ""})
    const [ alertState, setAlertState ] = useState({state: false, content: 'default alert content'})
    const navigate = useNavigate()
 
    function setUserName(value){
        setUserData((previousValue)=>{
            return { ...previousValue,  userName : value}
        })
    }

    function setUserPassword(value){
        setUserData((previousValue)=>{
            return { ...previousValue,  password : value}
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        
        if( userData.userName === '' || userData.password === '' ){
            setAlertState({state: true, content: "Los datos ingresados no son correctos."})
            setTimeout(() => {
                setAlertState((previousValue)=>{
                    return {...previousValue, state: false}
                })
            }, 5000);
        }else {
            navigate('/gamestation/home')
            console.log(userData)
        }
    }


    return (<>
        <div className="background">
            <div className='alert' style={{ display: alertState.state ? 'flex' : 'none' }}> <p>{alertState.content}</p> </div>
            <form className="form" onSubmit={handleSubmit}>
                <h4>Log<span>In</span></h4>
                <input type="text" value={userData.userName} onChange={(e)=>{ setUserName( e.target.value ) }} placeholder="Escribe tu nombre de usuario"/>
                <input type="password" value={userData.password} onChange={(e)=>{ setUserPassword( e.target.value ) }} placeholder="Escribe tu contraseña"/>
                <button type="submit">Ingresar</button>
            </form>
        </div>
    </>)
}

export default Login