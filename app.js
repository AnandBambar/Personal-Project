const groupButtons = document.querySelectorAll(".group-selector-button");
const chatHeader = document.querySelector(".chat-header");
const chatMessages = document.querySelector(".chat-messages");
const chatInputForm = document.querySelector(".chat-input-form");
const chatInput = document.querySelector(".chat-input");
const clearChatBtn = document.querySelector(".clear-chat-button");
const chatData = JSON.parse(localStorage.getItem("chatData")) || {
  English: [],
  Science: [],
  Music: [],
  Math: [],
};

let currentGroup = "English";

// Update the current group
const updateGroup = (groupName) => {
  currentGroup = groupName;
  chatHeader.textContent = `${groupName}`;

  groupButtons.forEach((btn) => {
    btn.classList.toggle("active-group", btn.dataset.group === groupName);
  });

  renderMessages();
};

// Render messages for the current group
const renderMessages = () => {
  chatMessages.innerHTML = "";
  const messages = chatData[currentGroup];
  messages.forEach((message) => {
    chatMessages.innerHTML += `
      <div class="message blue-bg">
        <div class="message-sender">${message.sender}</div>
        <div class="message-text">${message.text}</div>
        <div class="message-timestamp">${message.timestamp}</div>
      </div>
    `;
  });
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

// Send a message
const sendMessage = (e) => {
  e.preventDefault();

  const timestamp = new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const message = {
    sender: "You", // Simplified sender
    text: chatInput.value,
    timestamp,
  };

  // Save the message to the current group
  chatData[currentGroup].push(message);
  localStorage.setItem("chatData", JSON.stringify(chatData));

  // Render the new message
  renderMessages();

  // Clear input field
  chatInputForm.reset();
};

// Event listeners
chatInputForm.addEventListener("submit", sendMessage);
groupButtons.forEach((btn) =>
  btn.addEventListener("click", () => updateGroup(btn.dataset.group))
);

const clearChat = () => {
  chatData[currentGroup] = []; // Clears messages from the current group
  localStorage.setItem("chatData", JSON.stringify(chatData)); // Save the empty messages to localStorage
  renderMessages(); // Re-render the messages (now empty)
};

// Event listener for the "Clear Chat" button
clearChatBtn.addEventListener("click", clearChat);

// Initial render
renderMessages();
