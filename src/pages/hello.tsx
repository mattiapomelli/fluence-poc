import { Fluence } from "@fluencelabs/fluence";
import { kras } from "@fluencelabs/fluence-network-environment";
import { useEffect, useState } from "react";

import { Button } from "@components/basic/button";
import { Input } from "@components/basic/input";

import { sendMessage, registerMessage } from "../_aqua/hello";

import type { NextPage } from "next";

const relayPeer = kras[0];

interface PeerInfo {
  peerId: string;
  relayPeerId: string;
}

const HelloPage: NextPage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [peerInfo, setPeerInfo] = useState<PeerInfo | null>(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const [receiverPeerId, setReceiverPeerId] = useState("");

  useEffect(() => {
    const connect = async () => {
      try {
        // Initialize peer and connect to Fluence network
        await Fluence.start({
          connectTo: relayPeer,
        });
        const { peerId, relayPeerId } = Fluence.getStatus();
        setPeerInfo({
          peerId: peerId as string,
          relayPeerId: relayPeerId as string,
        });

        // Register service handler
        registerMessage({
          onMessage: (message, callParams) => {
            const newMessage =
              "From: " + callParams.initPeerId + ": " + message;
            setMessages((messages) => [...messages, newMessage]);
            return newMessage;
          },
        });

        setIsConnected(true);
      } catch (error) {
        console.log("Error while connecting or registering service: ", error);
      }
    };

    connect();

    const disconnect = async () => {
      await Fluence.stop();
      setIsConnected(false);
      setPeerInfo(null);
    };

    return () => {
      disconnect();
    };
  }, []);

  const onSendMessage = async () => {
    try {
      const newMessage = await sendMessage(
        receiverPeerId,
        relayPeer.peerId,
        message,
      );
      setMessages((messages) => [...messages, newMessage]);
      setMessage("");
    } catch (err) {
      console.log("Error while sending message: ", err);
    }
  };

  if (!isConnected || !peerInfo) {
    return <div>Not connected</div>;
  }

  return (
    <div>
      <div>
        Peer id: <strong>{peerInfo.peerId}</strong>
      </div>
      <div>
        Relay peer id: <strong>{peerInfo.relayPeerId}</strong>
      </div>
      <div>
        <Input
          label="Receiver peer id"
          value={receiverPeerId}
          onValueChange={setReceiverPeerId}
          className="mt-4"
          block
        />
      </div>
      <div className="mt-4">
        <h2 className="mb-2 font-bold">Messages:</h2>
        <div className="mb-6 flex flex-col gap-2">
          {messages.map((message) => (
            <div key={message} className="rounded-lg bg-gray-200 px-3 py-1">
              {message}
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <Input value={message} onValueChange={setMessage} />
        <Button onClick={onSendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default HelloPage;
