import { createServer } from "http";
import { Server } from "socket.io";
import { verifyAccessToken } from "../helpers/jwt.helper.js";
import { prisma } from "../prisma/connect.prisma.js";

export const initSocket = (app) => {
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    /* options */
  });

  //lắng nghe sự kiện kết nối từ client thông qua socket.io
  //.emit để gửi sự kiện từ server đến client, .on để lắng nghe sự kiện từ client gửi lên server
  // on (eventName, cb)
  io.on("connection", (socket) => {
    console.log("socket: ", socket.id);

    socket.on("CREATE_ROOM", (data, cb) => {
      const { targetUserIds, accessToken } = data;

      //xử lý thông tin accessToken và tìm user
      const { userId } = verifyAccessToken(accessToken);
      const userExits = prisma.users.findUnique({
        where: {
          id: userId,
        },
      });

      //xử lý targetUserIds thành unique array
      // set là tương tự như array, nhưng mà dữ liệu bên trong set sẽ không được phép trùng lặp
      const targetUserIdsSet = new Set([targetUserIds, userId]); //sử dụng set để loại bỏ các id trùng lặp giữa targetUserIds và userId
      const targetUserIdsUnique = Array.from(targetUserIdsSet);

      if (targetUserIdsUnique.length === 2) {
        //chat nhóm 2 người (1-1)
      } else {
        //chat nhóm nhiều hơn 2 người
      }

      console.log("data from client: ", {
        targetUserIds: targetUserIdsUnique,
        accessToken,
        userId,
      });
    });
  });

  return httpServer;
};
