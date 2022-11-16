import React, { useEffect } from 'react'
import '../styles/notFound.css'
import logo from '../imgs/logo.png'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
    const navigate = useNavigate()

    useEffect(()=>{
        setTimeout(() => {
            navigate("/gamestation/login", {replace: true})
        }, 3000)
    }, [])
    
    return (
        <div className='container'>
            <h1>404 Page not Found</h1>
            <h3> Será redirigido a la pagina de Log In</h3>
            <img src={logo} alt='logo'/>
        </div>
    )
}