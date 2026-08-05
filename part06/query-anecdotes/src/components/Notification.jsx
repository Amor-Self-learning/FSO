import useNotify from "../hooks/useNotify";

const Notification = () => {
  const {notification } = useNotify();
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    borderColor: notification && notification.ok ? 'green' : 'red'
  }
  if (!(notification && notification.message)) return null;

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification