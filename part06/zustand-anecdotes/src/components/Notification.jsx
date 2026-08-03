import useNotificationStore from '../notificationStore';

const Notification = () => {
  const {message, ok} = useNotificationStore();

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    color: ok ? 'green' : 'red'
  }

  return (
    <>
      {message && <div style={style}>
          {message}
      </div>}
    </>
  )
}

export default Notification