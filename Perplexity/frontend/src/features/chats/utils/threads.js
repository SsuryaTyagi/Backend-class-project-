/* Groups flat message documents (as returned by MongoDB/Mongoose)
   into a thread list: one entry per distinct `chat` id, titled
   with that chat's first user message, ordered by most recent activity. */
export function getThreadsFromMessages(messages) {
  const byChat = new Map();

  for (const m of messages) {
    if (!byChat.has(m.chat)) {
      byChat.set(m.chat, []);
    }
    byChat.get(m.chat).push(m);
  }

  const threads = [];
  for (const [chatId, msgs] of byChat.entries()) {
    const sorted = [...msgs].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    const firstUserMsg = sorted.find((m) => m.role === "user");
    const lastMsg = sorted[sorted.length - 1];

    threads.push({
      id: chatId,
      title: firstUserMsg ? firstUserMsg.content : "New chat",
      updatedAt: lastMsg.createdAt,
    });
  }

  return threads.sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );
}

export function getMessagesForChat(messages, chatId) {
  return messages
    .filter((m) => m.chat === chatId)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
}
