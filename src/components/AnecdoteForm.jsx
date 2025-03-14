import { useDispatch } from "react-redux"
import { createAnecdote } from '../reducers/store'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const newAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
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