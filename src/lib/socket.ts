import { Server } from 'socket.io';

export function setupSocket(io: Server) {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle custom events
    socket.on('message', (data) => {
      console.log('Message received:', data);
      // Broadcast to all connected clients
      io.emit('message', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
}