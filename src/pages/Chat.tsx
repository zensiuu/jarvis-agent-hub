import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { agents } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "user" | "jarvis";
  content: string;
  timestamp: Date;
  isCommand?: boolean;
}

function processCommand(input: string): string {
  const parts = input.trim().split(/\s+/);
  const cmd = parts[0]?.toLowerCase();
  const arg = parts.slice(1).join(" ");

  switch (cmd) {
    case "/status":
      return agents
        .map((a) => `- **${a.avatar} ${a.name}** — \`${a.status}\` (${a.model}, $${a.costToday.toFixed(2)} today)`)
        .join("\n");
    case "/start": {
      const agent = agents.find((a) => a.name.toLowerCase().includes(arg.toLowerCase()));
      return agent
        ? `✅ **${agent.name}** has been started. Model: ${agent.model}.`
        : `❌ Agent "${arg}" not found. Use \`/status\` to see available agents.`;
    }
    case "/stop": {
      const agent = agents.find((a) => a.name.toLowerCase().includes(arg.toLowerCase()));
      return agent
        ? `🛑 **${agent.name}** has been stopped.`
        : `❌ Agent "${arg}" not found. Use \`/status\` to see available agents.`;
    }
    case "/cost":
      return `💰 **Cost Summary**\n\nToday: **$${agents.reduce((s, a) => s + a.costToday, 0).toFixed(2)}**\nTotal: **$${agents.reduce((s, a) => s + a.costTotal, 0).toFixed(2)}**\n\nBreakdown:\n${agents.map((a) => `- ${a.name}: $${a.costToday.toFixed(2)}`).join("\n")}`;
    case "/help":
      return `📋 **Available Commands**\n\n- \`/status\` — View all agent statuses\n- \`/start <name>\` — Start an agent\n- \`/stop <name>\` — Stop an agent\n- \`/cost\` — View cost breakdown\n- \`/help\` — Show this help message\n\nYou can also chat naturally — I'll do my best to help!`;
    default:
      return "";
  }
}

function generateResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "👋 Hello! I'm **Jarvis**, your AI agent manager. I oversee all your agents and can help you manage them.\n\nTry `/help` to see available commands, or just ask me anything!";
  }
  if (lower.includes("agent")) {
    const online = agents.filter((a) => a.status === "online").length;
    return `You currently have **${agents.length} agents** configured, with **${online} online** right now. Want me to show their status? Try \`/status\`.`;
  }
  if (lower.includes("cost") || lower.includes("spending")) {
    const total = agents.reduce((s, a) => s + a.costToday, 0);
    return `Today's total spending is **$${total.toFixed(2)}** across all agents. Use \`/cost\` for a full breakdown.`;
  }
  return "I understand your message. As your agent manager, I can help you monitor, start, stop, and configure your agents.\n\nUse `/help` to see available commands!";
}

const initialMessages: Message[] = [
  {
    id: "welcome",
    role: "jarvis",
    content: "👋 Welcome back! I'm **Jarvis**, your AI agent manager.\n\nCurrently monitoring **6 agents** — 3 online, 1 idle, 1 offline, 1 with errors.\n\nType `/help` to see commands or just chat with me!",
    timestamp: new Date(),
  },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const isCmd = text.startsWith("/");
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
      isCommand: isCmd,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = isCmd ? processCommand(text) : generateResponse(text);
      const jarvisMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "jarvis",
        content: response || "I didn't recognize that command. Try `/help`.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, jarvisMsg]);
      setIsTyping(false);
    }, 600 + Math.random() * 800);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-foreground">Chat with Jarvis</h1>
        <p className="text-sm text-muted-foreground">Your AI agent manager — use commands or chat naturally</p>
      </div>

      <div className="flex-1 overflow-auto glass-card rounded-t-xl p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                msg.role === "jarvis" ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
              }`}>
                {msg.role === "jarvis" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </div>
              <div className={`max-w-[75%] rounded-xl px-4 py-3 ${
                msg.role === "user"
                  ? msg.isCommand
                    ? "bg-secondary border border-border font-mono text-sm"
                    : "bg-primary/10 border border-primary/20"
                  : "bg-secondary/50 border border-border"
              }`}>
                {msg.isCommand && (
                  <div className="flex items-center gap-1.5 text-primary text-[10px] mb-1 font-sans">
                    <Terminal className="h-3 w-3" /> Command
                  </div>
                )}
                <div className="text-sm text-foreground prose prose-sm prose-invert max-w-none [&>p]:mb-1 [&>ul]:mb-1">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1.5">
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Bot className="h-4 w-4" />
            </div>
            <div className="bg-secondary/50 border border-border rounded-xl px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="glass-card rounded-t-none rounded-b-xl border-t-0 p-3 flex gap-2">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
          placeholder="Type a message or /command..."
          className="flex-1 bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
        />
        <Button size="icon" onClick={sendMessage} disabled={!input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
