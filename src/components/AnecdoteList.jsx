/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"

const Anecdote = ({ anecdote, handleClick }) => {

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

    const anecdotes = useSelector(state => {
        console.log('AnecdoteList.filter', state.filter)
        if (state.filter === '') {
            return state.anecdotes
        }
        else {
            return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
        }
    })

    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(addVote(id))
    }

    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
    console.log('sortedAnecdotes', sortedAnecdotes)

    return (
        <div>
            {anecdotes.map(anecdote =>
                <Anecdote key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => vote(anecdote.id)} />
            )}
        </div>
    )
}

export default AnecdoteList