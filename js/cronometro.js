const axios = require("axios");
async function getAllUsers() {
  try {
    const { data } = await axios.get("http://localhost:3000/users");
    console.log("users", data);
  } catch (error) {
    console.log("error", error);
  }
}
async function addNewUser() {
  const user = document.querySelector(".user").value;
  try {
    await axios.post("http://localhost:3000/users", {
      name: user
    })
  } catch (error) {
    console.log("error", error);
  }
}
window.onload = () => {
  document.querySelector(".search").addEventListener("click", getAllUsers);
  document.querySelector(".insert").addEventListener("click", addNewUser);
}