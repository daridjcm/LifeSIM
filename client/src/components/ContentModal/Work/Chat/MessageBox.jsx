import {
  UserCircleIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";

export function MessageBox({ sender, content, timestamp }) {
  return (
    <div
      className={`flex items-start gap-2 ${sender === "user" ? "flex-row-reverse" : "flex-row"}`}
    >
      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
        {sender === "user" ? (
          <UserCircleIcon className="size-7 text-black" />
        ) : (
          <ChatBubbleLeftIcon className="size-7 text-black" />
        )}
      </div>
      <div
        className={`px-4 py-2 rounded-xl shadow-white shadow-sm max-w-[70%] ${
          sender === "user"
            ? "bg-zinc-800 text-white"
            : "bg-slate-200 text-black"
        }`}
      >
        <p className="font-bold mb-1">
          {sender.charAt(0).toUpperCase() + sender.slice(1)}
        </p>
        <p className="font-mono opacity-80">{content}</p>
        <p className="text-xs opacity-70 mt-1">{timestamp}</p>
      </div>
    </div>
  );
}
