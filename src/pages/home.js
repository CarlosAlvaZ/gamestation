import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import WishListCard from '../components/WishListCard'
import AddNew from '../components/AddNew'
import CreateNewList from '../components/CreateNewList'
import RemoveElement from '../components/RemoveElement'
import '../styles/home.css'

export default function Home() {

    const [ creatingNewElement, setCreatingNewElement ] = useState(false)
    const [ draggingState, setDraggingState ] = useState({dragging: false, draggingOverRemoveElement: false})
    const [ data, setData ] = useState([])


    function changeCreatingState(){
        setCreatingNewElement(prev => !prev)
    }

    function changeDraggingState(e){
        setDraggingState(prev => {
            return { ...prev, draggedElement: e.target, dragging: !prev.dragging }
        })
    }

    function draggOverHandler(e){
        e.preventDefault()
        setDraggingState(prev => {
            return { ...prev, draggingOverRemoveElement: true }
        })
    }

    function draggOutHandler(e){
        setDraggingState(prev => {
            return { ...prev, draggingOverRemoveElement: false }
        })
    }

    function getData(){
        fetch('https://proyectosid2.herokuapp.com/lists/')
            .then(res => res.json())
            .then(res => {
                const { data = [] } = res
                setData(data)
            }).catch(error => console.log( "Al programa le dio amsiedad", error )) 
    } 

    useEffect( () => {
        getData()
    }, [creatingNewElement, draggingState] )

    return (
        <>  
            <div style={{width: '100%', minHeight: '80vh', display: 'flex', flexDirection: 'column'}}>  
                <Layout title="Listas de Deseos">
                    <CreateNewList displayed={creatingNewElement}  handler={changeCreatingState} updateLists={getData} />
                    <div className='cards'>

                        {
                            data.map( lista => {
                                return <WishListCard key={lista._id} id={lista._id} title={lista.nombre_lista} color={lista.color} items={`${lista.elementos.length} elementos`} draggHandler={ e => changeDraggingState(e) } draggingState={draggingState} />
                            } )
                        }

                        <AddNew handler={changeCreatingState} dragging={draggingState.dragging}/>
                        <RemoveElement dOverHandler={ e => draggOverHandler(e) } dOutHandler={ e => draggOutHandler(e) } dragging={draggingState.dragging}/>

                    </div>

                </Layout>
            </div>
        </>
    )
}
