import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/wishListCard.css'

export default function WishListCard({id, color, title, items, draggHandler, draggingState}) {

    let colorToRender = parseInt(color)
    if(colorToRender < 1 || colorToRender > 7){
        colorToRender = 1
    }

    const navigate = useNavigate()

    function navigateToLocation(){
        navigate(`/${title}`)
    }
    
    const calcDragg = e => {
        if(draggingState.draggingOverRemoveElement){
            fetch(`https://proyectosid2.herokuapp.com/lists/${id}`, {
                method : 'DELETE',
            }).then(res=>res.json()).then(res=>console.log(res))
                .catch(error => console.log(error))
        } else {
            return
        }
    }

    return (
        <div className='card' onClick={navigateToLocation} draggable onDragStart={ draggHandler } onDragEnd={ e => {draggHandler(e); calcDragg(e)} } >
            <div className='colorDiv' style={{ backgroundColor: `var(--color-${colorToRender})` }}></div>
            <div className='data'>
                <h3>{title}</h3>
                <p>{items}</p>
            </div>
        </div>
    )
}
