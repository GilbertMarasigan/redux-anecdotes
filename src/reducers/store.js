import { createSlice, current } from "@reduxjs/toolkit";
import { createNotification, clearNotification } from "./notificationReducer";

const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState,
    reducers: {
        addVote(state, action) {
            const id = action.payload
            const anecdoteToChange = state.find(n => n.id === id)

            const changedAnecdote = {
                ...anecdoteToChange,
                votes: anecdoteToChange.votes + 1
            }

            console.log('state', current(state))

            return state.map(anecdote =>
                anecdote.id !== id ? anecdote : changedAnecdote
            )
        },
        addAnecdote(state, action) {
            const content = action.payload

            console.log('state before push: ', current(state))

            state.push({
                content,
                id: getId(),
                votes: 0
            })

            console.log('state after push: ', current(state))
        }
    }
})

export const { addAnecdote, addVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer


export const notifyAndDispatch = (actionType, payload) => {
    return (dispatch, getState) => {
        if (actionType === "addAnecdote") {
            dispatch(addAnecdote(payload))
            dispatch(createNotification(`You added: "${payload}"`))
        } else if (actionType === "addVote") {
            dispatch(addVote(payload))

            // Find the anecdote that was voted for
            const votedAnecdote = getState().anecdotes.find(anecdote => anecdote.id === payload);
            if (votedAnecdote) {
                dispatch(createNotification(`You voted: "${votedAnecdote.content}"`))
            }
        }

        // Remove notification after 5 seconds
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }
}