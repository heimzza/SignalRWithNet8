using FormulaOne.ChatService.Models;
using Microsoft.AspNetCore.SignalR;

namespace FormulaOne.ChatService.Hubs;

public class ChatHub : Hub
{
    public async Task JoinChat(UserConnection conn)
    {
        await Clients.All
            .SendAsync("ReceiveMessage", "admin", $"{conn.UserName} has joined the chat");
    }

    public async Task JoinSpecificChatRoom(UserConnection conn)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, conn.ChatRoom);

        await Clients.Group(conn.ChatRoom)
            .SendAsync("JoinSpecificChatRoom", "admin", $"{conn.UserName} has joined {conn.ChatRoom}");
    }
}
