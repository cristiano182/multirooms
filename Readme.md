## Multirooms

- Simple lib for create multirooms chat
- Make an scaleable chat.Handle location and online users.

## Getting Started

$ npm install multirooms --save

or

$ yarn add multirooms --save

## Channels

- #### userConnected

  - receives the location user, client socket and increment onlineUsers array with location(latitude, longitude)
  
  - sends the all messages for client connected and sends for all cliente connected new onlinesUsers array value 
  
  
- #### pagination

  - receives the number to skip and room to send messages.
  - sends the pagination messages with limit value.
  
- #### disconnect

    - remove the current client in onlineUsers array and sends new array value to all clients connected.
    
- #### messages

    - receives, create and save  a new message.
    - sends a new message receive and new numberMessages value in current room  to all users connected.
    
    
    
## How to use
- Mongoose and Socket.io is a dependency for this library. 
- const multirooms = require('multirooms')

- Set configuration in  multirooms.setConfig()

  - Receives 3 params, (ModelMessageSchema, Number of Rooms, Number of skip for Pagination function).




- Create a Message Mongoose Schema.

<img src="https://github.com/cristiano182/multirooms/blob/master/mongooseSchema.png" width="500" />


- Running Node-Server and follow the Example.

<img src="https://github.com/cristiano182/multirooms/blob/master/Example.png" width="500" />

