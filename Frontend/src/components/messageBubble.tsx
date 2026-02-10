interface Props {
  role: "user" | "assistant";
  content: string;
}

export default function MessageBubble({ role, content }: Props) {
  return (
    <div
      style={{
        marginBottom: 12,
        color: role === "user" ? "#38bdf8" : "#a7f3d0",
      }}
    >
      <strong>{role === "user" ? "You" : "AI"}:</strong> {content}
    </div>
  );
}
