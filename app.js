const user1SelectorBtn = document.querySelector("#user1-selector");
const user2SelectorBtn = document.querySelector("#user2-selector");
const groupButtons = document.querySelectorAll(".group-selector-button");
const chatHeader = document.querySelector(".chat-header");
const chatMessages = document.querySelector(".chat-messages");
const chatInputForm = document.querySelector(".chat-input-form");
const chatInput = document.querySelector(".chat-input");
const clearChatBtn = document.querySelector(".clear-chat-button");

const chatData = JSON.parse(localStorage.getItem("chatData")) || {
  General: [],
  Sports: [],
  Music: [],
  Tech: [],
};

let currentSender = "user1";
let currentGroup = "General";

const updateUser = (name) => {
  currentSender = name;
  user1SelectorBtn.classList.toggle("active-person", name === "user1");
  user2.classList.toggle("active-person", name === "user2");
  chatInput.placeholder = `Type here, ${currentSender}...`;
};

const updateGroup = (groupName) => {
  currentGroup = groupName;
  chatHeader.textContent = `${groupName} Chat`;

  groupButtons.forEach((btn) => {
    btn.classList.toggle("active-group", btn.dataset.group === groupName);
  });

  renderMessages();
};

const renderMessages = () => {
  chatMessages.innerHTML = "";
  const messages = chatData[currentGroup];
  messages.forEach((message) => {
    chatMessages.innerHTML += `
      <div class="message ${message.sender === currentSender ? "blue-bg" : "gray-bg"}">
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
    sender: currentSender,
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

// Clear chat messages for the current group
clearChatBtn.addEventListener("click", () => {
  chatData[currentGroup] = [];
  localStorage.setItem("chatData", JSON.stringify(chatData));
  renderMessages();
});

// Event listeners
chatInputForm.addEventListener("submit", sendMessage);
user1SelectorBtn.addEventListener("click", () => updateUser("user1"));
user2SelectorBtn.addEventListener("click", () => updateUser("user2"));
groupButtons.forEach((btn) =>
  btn.addEventListener("click", () => updateGroup(btn.dataset.group))
);

renderMessages();