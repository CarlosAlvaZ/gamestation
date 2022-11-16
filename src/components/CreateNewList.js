import React, { useState } from 'react'
import close from '../imgs/close.png'
import '../styles/createNewList.css'

export default function CreateNewList( { displayed, handler, updateLists } ) {
    
    const [formData, setFormData] = useState({color: '1'})

    const dataSetter = e => {
        setFormData(previousValue => {
            return {...previousValue, [e.target.name] : e.target.value}
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(formData)

        const dataToPost = {
            nombre_lista : formData.title,
            color : formData.color,
            descripcion : formData.description,
            elementos: []
        }

        fetch("https://proyectosid2.herokuapp.com/lists/", {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(dataToPost),
        }).then(res=>res.json()).then(res=>updateLists())
            .catch(error => console.log(error.json()))

        handler()
        setFormData({
            title: "",
            description: "",
            color: "1"
        })
    }

  return (
    <div className='overlay' style={ { display: displayed ? 'flex' : 'none' } }>
        <div className='createCard'>
            <h1>Nueva Lista de Deseos: </h1>
            <div className='close' onClick={handler}>
                <img src={close} alt='Close' />
            </div>

            <form className='createForm' onSubmit={ e => handleSubmit(e) }>

                <input type='text' placeholder='Nombre de la nueva lista' required name='title' value={formData.title} onChange={e=>dataSetter(e)} className='title'/>

                <label htmlFor='description'>Descripcion de lista</label>
                <input type='textarea' id='description' name='description' required value={formData.description} onChange={e=>dataSetter(e)}/>

                <label htmlFor='color'>Color:</label>

                <div className='colorDiv'>

                    <input type='radio' name='color' value='1' onChange={e=>{dataSetter(e)}} defaultChecked/>
                    <div className='color color1' />

                    <input type='radio' name='color' value='2' onChange={e=>{dataSetter(e)}}/>
                    <div className='color color2' />

                    <input type='radio' name='color' value='3' onChange={e=>{dataSetter(e)}}/>
                    <div className='color color3' />

                    <input type='radio' name='color' value='4' onChange={e=>{dataSetter(e)}}/>
                    <div className='color color4' />

                    <input type='radio' name='color' value='5' onChange={e=>{dataSetter(e)}}/>
                    <div className='color color5' />

                    <input type='radio' name='color' value='6' onChange={e=>{dataSetter(e)}}/>
                    <div className='color color6' />

                    <input type='radio' name='color' value='7' onChange={e=>{dataSetter(e)}}/>
                    <div className='color color7' />
                </div>

                <button type='submit'>Crear Nueva Lista</button>
            </form>
        </div>
    </div>
  )
}
