"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";
import { TokenService } from "@/services/token.service";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Only connect if user is authenticated
    if (!user) {
        if (socket) {
            console.log("Socket: User logged out, disconnecting...");
            socket.disconnect();
            setSocket(null);
            setIsConnected(false);
        }
        return;
    }

    const token = TokenService.getAccessToken();

    if (!token) {
        console.warn("Socket: No token found in TokenService, skipping connection");
        return;
    }

    console.log("Socket: Initializing connection...");

    // Initialize socket
    const socketInstance = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000", {
      auth: {
        token,
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    

    setSocket(socketInstance);

    // Cleanup on unmount or user change
    return () => {
      socketInstance.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
