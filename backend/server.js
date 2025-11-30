const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('join_room', (orderId) => {
        socket.join(orderId);
        console.log(`User ${socket.id} joined room ${orderId}`);
    });

    socket.on('update_location', (data) => {
        // data: { orderId, location: { latitude, longitude }, role: 'customer' | 'driver' }
        const { orderId, location, role } = data;
        // console.log(`Location update from ${role} in room ${orderId}:`, location);
        // Broadcast to everyone else in the room
        socket.to(orderId).emit('location_updated', { location, role });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});
