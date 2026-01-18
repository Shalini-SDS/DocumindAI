import { Bot } from "lucide-react";
import { mockRootProps } from "./AssistantMockData";

type ChatMessage = {
  id: string;
  author: "assistant" | "user";
  timestamp: string;
  content: string[];
};

type Capability = {
  label: string;
  description: string;
};

type Stat = {
  label: string;
  value: string;
};

function ChatMessageBubble({ message }: { message: ChatMessage }) {
  return (
    <div className="chat-bubble">
      <div className="chat-meta">
        <Bot size={16} />
        <span>Smart Auditor AI</span>
        <time>{message.timestamp}</time>
      </div>
      {message.content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

function SuggestionButton({ question, onClick }: { question: string; onClick?: () => void }) {
  return (
    <button className="suggestion-item" onClick={onClick}>
      {question}
    </button>
  );
}

function CapabilityItem({ capability }: { capability: Capability }) {
  return (
    <li>
      <strong>{capability.label}</strong>
      <span>{capability.description}</span>
    </li>
  );
}

function StatItem({ stat }: { stat: Stat }) {
  return (
    <div className="quick-stat">
      <span>{stat.label}</span>
      <strong>{stat.value}</strong>
    </div>
  );
}

export default function AdminAssistant() {
  const { chatMessages, suggestedQuestions, capabilities, stats } = mockRootProps;

  return (
    <div className="assistant-layout">
      <div className="section-card assistant-chat">
        <div className="chat-header">
          <div className="chat-profile">
            <div className="chat-avatar">
              <Bot size={20} />
            </div>
            <div>
              <h3>Smart Auditor AI</h3>
              <span>Always online and ready to help</span>
            </div>
          </div>
          <span className="badge green">Online</span>
        </div>
        <div className="chat-messages">
          {chatMessages.map((message) => (
            <ChatMessageBubble key={message.id} message={message} />
          ))}
        </div>
        <div className="chat-footer">
          <input className="chat-input" placeholder="Ask me anything about your expenses..." />
          <button className="primary-button" style={{ width: 120 }}>
            Send
          </button>
        </div>
      </div>
      <div className="assistant-sidebar">
        <div className="section-card suggestion-card">
          <h3>Suggested Questions</h3>
          <div className="suggestion-list">
            {suggestedQuestions.map((question) => (
              <SuggestionButton key={question} question={question} />
            ))}
          </div>
        </div>
        <div className="section-card capability-card">
          <h3>AI Capabilities</h3>
          <ul className="capability-list">
            {capabilities.map((item) => (
              <CapabilityItem key={item.label} capability={item} />
            ))}
          </ul>
        </div>
        <div className="section-card stats-card">
          <h3>Quick Stats</h3>
          <div className="quick-stats">
            {stats.map((stat) => (
              <StatItem key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}