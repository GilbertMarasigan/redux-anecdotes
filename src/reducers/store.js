import { createSlice, current } from "@reduxjs/toolkit";
import { setNotification } from "./notificationReducer";
import anecdoteService from '../services/anecdotes'

// const anecdotesAtStart = [
//     'If it hurts, do it more often',
//     'Adding manpower to a late software project makes it later!',
//     'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//     'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//     'Premature optimization is the root of all evil.',
//     'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//     return {
//         content: anecdote,
//         id: getId(),
//         votes: 0
//     }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
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
        },
        setAnecdotes(state, action) {
            return action.payload
        },
        appendAnecdote(state, action) {
            state.push(action.payload)
        }
    }
})

export const { addAnecdote, addVote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(appendAnecdote(newAnecdote))
        dispatch(setNotification(`You added: "${newAnecdote.content}"`, 10))
    }
}

export const saveVote = (id) => {
    return async (dispatch, getState) => {
        const currentAnecdote = getState().anecdotes.find(a => a.id === id)

        if (!currentAnecdote) {
            console.error("Anecdote not found")
            return
        }

        const updatedAnecdote = { ...currentAnecdote, votes: currentAnecdote.votes + 1 }
        const response = await anecdoteService.updateVotes(updatedAnecdote)

        dispatch(addVote(response.id))
        dispatch(setNotification(`You voted: "${response.content}"`, 10))
    }
}

export default anecdoteSlice.reducer