const socket = io();

const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");
const messages = document.getElementById("messages");
const usernameInput = document.getElementById("username");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value && usernameInput.value) {
    socket.emit("chat message", {
      user: usernameInput.value,
      message: input.value
    });
    input.value = "";
  }
});

socket.on("chat message", (data) => {
  const msg = document.createElement("div");
  msg.textContent = `${data.user} : ${data.message}`;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
});
