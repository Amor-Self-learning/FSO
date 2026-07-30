const Notification = ({message}) => {
  return <div className={`message ${message.ok ? "success" : "error"}`}>{message.text}</div>
}

export default Notification;