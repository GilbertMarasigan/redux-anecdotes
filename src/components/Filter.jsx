import { filterChange } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const Filter = () => {

    const dispatch = useDispatch()

    const handleChange = (event) => {
        const filterString = event.target.value
        console.log('filterString', filterString)
        dispatch(filterChange(filterString))
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input type="text" name="filter" onChange={handleChange} />
        </div>
    )

}

export default Filter