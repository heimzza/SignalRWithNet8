using FormulaOne.ChatService.DataService;
using FormulaOne.ChatService.Models;
using Microsoft.AspNetCore.SignalR;

namespace FormulaOne.ChatService.Hubs;

public class ChatHub : Hub
{
    private readonly SharedDb _sharedDb;

    public ChatHub(SharedDb sharedDb)
    {
        _sharedDb = sharedDb;
    }

    public async Task JoinChat(UserConnection conn)
    {
        await Clients.All
            .SendAsync("ReceiveMessage", "admin", $"{conn.UserName} has joined the chat");
    }

    public async Task JoinSpecificChatRoom(UserConnection conn)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, conn.ChatRoom);
        
        _sharedDb.Connections.TryAdd(conn.ChatRoom, conn);
        _sharedDb.Connections[Context.ConnectionId] = conn;

        await Clients.Group(conn.ChatRoom)
            .SendAsync("JoinSpecificChatRoom", "admin", $"{conn.UserName} has joined {conn.ChatRoom}");
    }

    public async Task ReceiveSpecificMessage(string message)
    {
        if (_sharedDb.Connections.TryGetValue(Context.ConnectionId, out UserConnection conn))
        {
            await Clients.Group(conn.ChatRoom)
                .SendAsync("ReceiveSpecificMessage", conn.UserName, message);
        }
    }
}
