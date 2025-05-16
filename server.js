// server.js - ES Module version
import dotenv from "dotenv";
import express from "express";
import http from "http";
import corsMiddleware from "./middlewares/cors.js";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import uploadRoutes from "./routes/uploadRouter.js";
import chatRoutes from "./chatLog/logs.js"; // (채팅 로그용 API)
import initializeSocket from "./socket.js"; // 소켓 파일 불러오기

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

// ✅ 미들웨어
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ API 라우트 연결
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/chat", chatRoutes); // (채팅 로그 API)

// ✅ 서버 상태 확인
app.get("/", (req, res) => {
  res.send("서버 정상 작동 중입니다.");
});

// ✅ 소켓 서버 연결
initializeSocket(server);

// ✅ 서버 시작
server.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});