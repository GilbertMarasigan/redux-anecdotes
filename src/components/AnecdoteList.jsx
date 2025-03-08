import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"

const Anecdote = ({ anecdote, handleClick }) => {
    console.log('anecdote', anecdote)
    return (
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => handleClick()}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(addVote(id))
    }

    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
    console.log('sortedAnecdotes', sortedAnecdotes)

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <Anecdote key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => vote(anecdote.id)} />
            )}

        </div>
    )
}

export default AnecdoteList