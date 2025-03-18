const MessageContainer = ({ messages }) => {
    return <div>
            {
                messages.map((message, index) =>
                    <table striped bordered>
                        <tr key={index}>
                            <td>{message.username}</td>
                            <td>{message.msg}</td>
                        </tr>
                    </table>
                )
            }
        </div>
}

export default MessageContainer;