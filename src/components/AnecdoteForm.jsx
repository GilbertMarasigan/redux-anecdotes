import { useDispatch } from "react-redux"
// import { addAnecdote } from "../reducers/anecdoteReducer"
import { notifyAndDispatch } from '../reducers/store'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const newAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(notifyAndDispatch("createAnecdote", newAnecdote))
    }

    return (<>
        <h2>create new</h2>
        <form onSubmit={newAnecdote}>
            <div><input name='anecdote' /></div>
            <button type='submit'>create</button>
        </form>
    </>)

}



export default AnecdoteForm