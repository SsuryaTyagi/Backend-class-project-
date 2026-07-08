/* ---------------------------------------------------------
   Dummy data — UI only, no network calls.
   Swap MESSAGES / SOURCES for real state from your
   Redux store + LangChain/Mistral backend later.
--------------------------------------------------------- */

export const THREAD_HISTORY = [
  { id: "t1", title: "How does JWT refresh token rotation work?" },
  { id: "t2", title: "Redis vs in-memory caching for session data" },
  { id: "t3", title: "LangChain agents with Mistral AI tool calling" },
  { id: "t4", title: "Best practices for MongoDB schema design" },
  { id: "t5", title: "Razorpay webhook signature verification" },
];

export const QUICK_PROMPTS = [
  "Explain event loop in Node.js",
  "Compare REST vs GraphQL for a fresher project",
  "Design a MongoDB schema for a chat app",
  "How to secure JWT in httpOnly cookies",
];

export const SOURCES = [
  {
    id: 1,
    domain: "developer.mozilla.org",
    title: "Using the Fetch API — MDN Web Docs",
    snippet:
      "The Fetch API provides an interface for fetching resources, offering a more powerful and flexible replacement for XMLHttpRequest.",
  },
  {
    id: 2,
    domain: "nodejs.org",
    title: "Node.js Event Loop, Timers, and process.nextTick()",
    snippet:
      "The event loop is what allows Node.js to perform non-blocking I/O operations despite JavaScript being single-threaded.",
  },
  {
    id: 3,
    domain: "stackoverflow.com",
    title: "Understanding the Node.js event loop phases",
    snippet:
      "Each phase has a FIFO queue of callbacks to execute. While each phase is special, generally the callbacks will execute in that phase.",
  },
  {
    id: 4,
    domain: "freecodecamp.org",
    title: "The Node.js Event Loop: Not So Single Threaded",
    snippet:
      "Node uses a small number of threads to handle many clients, relying on the OS kernel for async I/O operations.",
  },
];

/* Role-based conversation thread: role is "user" or "ai".
   An "ai" message can optionally carry a `sources` array,
   which renders as a source strip above its text. */
export const MESSAGES = [
  {
    role: "user",
    content: "Explain event loop in Node.js",
  },
  {
    role: "ai",
    content:
      "The event loop in Node.js is a mechanism that allows Node.js to perform non-blocking I/O operations, despite the fact that JavaScript is single-threaded. It does this by offloading operations to the system kernel whenever possible.",
    sources: [SOURCES[1], SOURCES[2], SOURCES[3]],
  },
  {
    role: "user",
    content: "Does the browser event loop work the same way?",
  },
  {
    role: "ai",
    content:
      "Browsers use a similar single-threaded event loop model, but the task sources differ — DOM events, rendering, and network callbacks queue instead of Node's libuv thread pool. Both environments separate microtasks like Promise callbacks from macrotasks like setTimeout, always draining the microtask queue before moving to the next macrotask.",
    sources: [SOURCES[1], SOURCES[2]],
  },
];
