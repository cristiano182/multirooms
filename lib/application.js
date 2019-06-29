var onlineClients = []
var NUMBER_OF_ROOMS = ''
var MESSAGE = ''
var NUMBER_OF_PAGINATION = ''

function setConfig(modelMessage, numberRooms, numberPagination) {
    try {
        NUMBER_OF_ROOMS = numberRooms
        MESSAGE = modelMessage
        NUMBER_OF_PAGINATION = numberPagination ? numberPagination : 20
    } catch (error) {
        console.log(error)
    }
}

async function sendNumberMessages(socket, room, forAllUsers) {
    try {
        const rtn = await MESSAGE.countDocuments({ room })
        const numberMessages = { room, qnt: rtn }
        if (forAllUsers) {
            socket.emit('numberMessages', numberMessages);
            socket.broadcast.emit('numberMessages', numberMessages);
        }
        else
            socket.emit('numberMessages', numberMessages);

    } catch (err) {
        console.log('Do not possible send array' + 'Because =>' + err)
    }
}

async function onMessageReceived(socket, message, room) {
    try {
        const newMessage = await new MESSAGE({ text: message.text, user: message.user, room });
        const retorno = await newMessage.save();
        socket.broadcast.emit('Messages', [retorno], null, room, initialGet = false);
        sendNumberMessages(socket, room, forAllUsers = true)
    } catch (error) {
        console.log(error)
    }
}

async function disconnectUser(client) {
    try {
        let newArray = await onlineClients.filter(obj => obj.user != client.id)
        onlineClients = newArray
        client.broadcast.emit('userConnected', newArray)
    } catch (error) {
        console.log(error)
    }
}

async function connectUser(client,location) {
    try {
        if (location) {
            let obj = { user: client.id, latitude: location.latitude, longitude: location.longitude }
            await onlineClients.push(obj)
            client.broadcast.emit('userConnected', onlineClients)
            client.emit('userConnected', onlineClients)
        }
        else {
            let obj = { user: client.id, latidute: null, longitude: null }
            await onlineClients.push(obj)
            client.broadcast.emit('userConnected', onlineClients)
            client.emit('userConnected', onlineClients)
        }
    } catch (error) {
        console.log(error)
    }
}

async function userConnected(client,location) {
    try {
        let rooms = []
        for (var i = 1; i < parseInt(NUMBER_OF_ROOMS) + 1; i++)
            rooms.push(`room${i}`)

        rooms.map(async room => {
            const messages = await MESSAGE.find({ room }).limit(NUMBER_OF_PAGINATION).sort({ createdAt: 'desc' })
            if (!messages.length) return;
            client.emit('Messages', messages, null, room, initialGet = true);
            sendNumberMessages(client, room, forAllUsers = false)
        })
        connectUser(client,location)
    } catch (err) {
        console.log(err);
    }
}

async function sendPagination(client, skip, room) {
    try {
        const messages = await MESSAGE.find({ room })
            .sort({ createdAt: 'desc' })
            .skip(skip)
            .limit(NUMBER_OF_PAGINATION);
        if (!messages.length) return;
        client.emit('Messages', messages, skip, room);
    } catch (error) {
        console.log(error)
    }
}

module.exports = { sendPagination, userConnected, connectUser, disconnectUser, onMessageReceived, setConfig }