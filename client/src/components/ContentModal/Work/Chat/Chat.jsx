"use client"
import { useState, useEffect } from "react"
import { TrashIcon, ChatBubbleLeftEllipsisIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline"
import { Button } from "@heroui/react";
import chatData1 from './chatBoss.json';
import chatData2 from './chatAnalia.json';
import { MessageBox } from "./MessageBox.jsx"
import { PresetButton } from "./PresetButton.jsx"

export default function Chat({ people }) {
  const [messages, setMessages] = useState([])
  const [selectedPerson, setSelectedPerson] = useState(people)
  const [presetResponses, setPresetResponses] = useState([])
  const [responses, setResponses] = useState([])

  useEffect(() => {
    if(setSelectedPerson && people === 'boss') {
      setPresetResponses(chatData1.userPresetResponses)
      setResponses(chatData1.responses)
    } else {
      setPresetResponses(chatData2.userPresetResponses)
      setResponses(chatData2.responses)
    }
  }, [])

  const handlePresetResponse = (response) => {
    const newUserMessage = {
      id: Date.now().toString(),
      sender: "user",
      content: response.content,
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages((prev) => [...prev, newUserMessage])

    // Simulate response from selected person
    setTimeout(() => {
      const responseContent =
        selectedPerson === "boss" ? responses.boss[response.id] : responses.analia[response.id];

      const replyMessage = {
        id: (Date.now() + 1).toString(),
        sender: selectedPerson,
        content: responseContent,
        timestamp: new Date().toLocaleTimeString(),
      }

      setMessages((prev) => [...prev, replyMessage])
    }, 1000)
  }

  const handleClearChat = () => {
    setMessages([])
  }

  return (
    <div className="flex w-auto m-auto h-screen bg-zinc-800 overflow-hidden">
      <div className="w-full mx-auto p-4 flex flex-col">
        <div className="rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
          <div className="bg-zinc-900 text-white p-4 flex items-center">
            <ChatBubbleLeftEllipsisIcon className="size-12 mr-4" />
            <h1 className="text-xl font-bold">Chat with {(people === "boss") ? "Boss" : "Analia"}</h1>
          </div>
          <div className="flex flex-col gap-2 overflow-y-auto mb-4 space-y-4 p-4 bg-zinc-950 rounded-b-lg h-full">
            {messages.map((message) => (
              <MessageBox
                key={message.id}
                sender={message.sender}
                content={message.content}
                timestamp={message.timestamp}
              />
            ))}
          </div>
        </div>
        {/* Preset Responses */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 p-4 bg-zinc-950 rounded-lg">
          {presetResponses.map((response) => (
            <PresetButton
              key={response.id}
              response={response}
              onClick={handlePresetResponse}
            />
          ))}
          <div className="flex gap-2 sm:justify-center md:justify-between lg:justify-start">
            <Button
              variant="shadow"
              size="lg"
              color="danger"
              onPress={handleClearChat}
            >
              <TrashIcon className="size-12 text-white" />
              Delete Chat
            </Button>
            <Button
              variant="shadow"
              color="primary"
              size="lg"
              onPress={() => window.location.href = '/'}
            >
              <ArrowLeftStartOnRectangleIcon className="size-12 text-white" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
