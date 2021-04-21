import "./MessageItem.css"

export default function MessageItem(props) {
    let otherUser = props.conversation.users.filter(item => 
        item._id !== props.userId)

    return (
        <div className="message-item">
            {otherUser.map(user => {
                return (
                    <div key={user._id}>
                        <h4>{user.name}</h4>
                        <h5>{user.email}</h5> 
                    </div>
                )
            })}
        </div>
    )
}