// Mock data for the AI Assistant component

// Data passed as props to the root component
export const mockRootProps = {
  chatMessages: [
    {
      id: "welcome",
      author: "assistant" as const,
      timestamp: "08:11 pm",
      content: [
        "Hello! I'm Smart Auditor AI, your intelligent expense assistant.",
        "I can help you with analyzing expense patterns, explaining flagged transactions, and recommending cost-saving actions."
      ]
    },
    {
      id: "followup",
      author: "assistant" as const,
      timestamp: "08:12 pm",
      content: [
        "Ask a question to get started, or pick one of the suggested prompts on the right."
      ]
    }
  ],
  suggestedQuestions: [
    "Why was the Global Airlines transaction flagged?",
    "What are my top spending categories?",
    "How can I improve my expense integrity score?",
    "Explain the recent anomalies detected?",
    "What cost-saving opportunities are available?"
  ],
  capabilities: [
    { label: "Trend Analysis", description: "Identify spending patterns" },
    { label: "Anomaly Detection", description: "Explain flagged transactions" },
    { label: "Report Generation", description: "Custom insights on demand" },
    { label: "Smart Recommendations", description: "Cost saving opportunities" }
  ],
  stats: [
    { label: "Response Time", value: "< 2 sec" },
    { label: "Accuracy Rate", value: "94.8%" },
    { label: "Questions Answered", value: "1,247" }
  ]
};