// socket.js - ES Module version
import { Server } from 'socket.io';
import pool from './DB.js'; // Note the .js extension is required in ES Modules

export default function(server) {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:4000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('📡 Client connected', socket.id);

    socket.on('message', async (msg) => {
      console.log('💬 message received:', msg);

      // ✅ DB 저장
      try {
        const conn = await pool.getConnection();
        await conn.query(
          'INSERT INTO messages (username, content, time) VALUES (?, ?, ?)',
          [msg.user , msg.content, new Date(msg.time)]
        );
        conn.release();
      } catch (err) {
        console.error('❌ 메시지 저장 실패:', err);
      }

      // ✅ 브로드캐스트
      io.emit('message', msg);
    });

    socket.on('disconnect', () => {
      console.log('❌ Client disconnected', socket.id);
    });
  });
};