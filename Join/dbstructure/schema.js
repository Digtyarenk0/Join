const {buildSchema} = require('graphql');

const schema = buildSchema(`
    type Query {
        login(login: String!, password: String!): Tokens
        getUser(id: String!): User
        checkLogin(login: String!): String
        getMessage(id: String!): Message
        getMedia(id: String!): Media
        getMessagesByChat(id: String): [Message]
        getChatsByUsers(query: String): [Chat]
        getChatById(id: String): Chat
        getChatsUs(query: String): [ChatsUser]
        getUsers: [User]
        getUsersByChannel(id: String): [User]
        getUsersByUsername(username: String): [User]
        getFriends(username: String): [User]
        getMessages: [Message]
    }
    type Mutation {
        refreshTokens(refTokens: String): Tokens
        registration(user: UserDataInput): User
        addFriend(id: String): User
        createChat(chat: ChatCreateInput): Chat
        addUserToChat(chat: InsertUserToChat): String
        uploadUserIco(filename: String,originalFilename: String): Media
        updateUserIco(filename: String,originalFilename: String): Media
        deleteUserOfChannel(idChannel: String,idUser: String): Notification
        postMessage(message: MessageInput): Message
        postMessageMedia(id: String, url: String, channelId: String): Message
        upsertMessage(message: upsertMessage): Message
    }
    
    type Notification {
    text: String
    content: String
    }

    type User {
        id: ID
        username: String
        media: [Media]
        messages: [Message]
    }
    
    type Tokens{
    accessToken: String,
    refreshToken: String
    }
    
     type Chat {
        id: ID
        name: String
        messages: [Message]
        users: [User]
     }

     type ChatsUser{
     id: ID
     name: String
     lastMessage: Message
     }

    type Message {
        id: ID
        content: String
        createdAt: String
        user: User
        type: String
    }
    
    input UserDataInput{
       username: String
       login: String
       password: String
    }
    
    type Media {
        id: String
        urlFilename: String
        filename: String
        user: User
        message: Message
    }
    
    input ChatCreateInput{
      name: String
    }
    
    input InsertUserToChat{
        userId: ID
        chatId: ID
    }
    
    input MessageInput {
        chatId: ID
        content: String
    }
    
     input MessageInputMedia {
        chatId: ID
        content: String
    }
    
    input upsertMessage{
        id: ID
        content: String
    }
`);

module.exports = schema