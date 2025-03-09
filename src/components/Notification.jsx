import { useSelector } from "react-redux"

const Notification = () => {

  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  const notification = useSelector(state => state.notification)

  console.log('notification', notification)

  if (notification === '') {
    return
  }
  else {
    return (
      <div style={style}>
        {notification}
      </div>
    )

  }

}

export default Notification