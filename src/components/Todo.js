import React from 'react'
import Modal from './Modal'

const Todo = () => {

    const [data, setData] = React.useState('')

    function reducer(state,action){

        if(action.type === "ADD_ITEM"){
            const newData = [...state.value, action.payload]
            return{
                ...state,
                value:newData,
                modalOpen:true,
                modalContent:"Item added to the list !"
            }
        }

        if(action.type === "REMOVE_ITEM"){
            const newData = state.value.filter((item) => item.id!== action.payload)
            return{
                ...state,
                value:newData,
                modalOpen:true,
                modalContent:"Item was removed from the list !"
            }
        }
        if(action.type === "NO_ITEM"){
            return{
                ...state,
                modalOpen:true,
                modalContent:"No item was added !"
            }
        }
        if(action.type === "CLOSE_MODAL"){
            return{
                ...state,
                modalOpen:false
            }
        }

    }

    const defaultState={
        value:[],
        modalOpen: false,
        modalContent:" "
    }

    const [state, dispatch] = React.useReducer(reducer, defaultState)

    function handleSubmit(e){
        e.preventDefault()
        if(data){
            const newData = {id: new Date().getTime(), data}
            dispatch({type: "ADD_ITEM" , payload: newData})
            setData('')
        }

        else{
            dispatch({type: "NO_ITEM"})
        }

    }

    function removeItem(item){
        dispatch({type: "REMOVE_ITEM" , payload:item.id})

    }

    function closeModal(){
        dispatch({type:"CLOSE_MODAL"})
    }

    const ele = state.value.map(function(item){
        return(
            <div className='content' key={item.id}>
                <p>{item.data}</p>
                <button onClick={() => removeItem(item)}>Remove Item</button>
            </div>
        )
    })
  return (
    <div>
        <h3>
            Todo App using useReducer
        </h3>

        <form onSubmit={handleSubmit}>
            {state.modalOpen && <Modal  closeModal={closeModal} modal = {state.modalContent} />}
            <input placeholder='add a todo..' value={data} onChange={(e)=> setData(e.target.value)} />
            <button>Add</button>
        </form>
        {ele}
    </div>
  )
}

export default Todo