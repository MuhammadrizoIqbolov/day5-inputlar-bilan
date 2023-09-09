const form = document.querySelector(".form");
const inputs = document.querySelectorAll(".inputs");
const box = document.querySelector(".box");
const modal = document.querySelector(".modal");
const formModal = document.querySelector(".form-modal");
const inputsModal = document.querySelectorAll(".inputs-modal");
const closeBtn = document.querySelector(".close-btn");

let users = [];

const render = () => {
  box.innerHTML = "";
  for (let i of users) {
    let div = document.createElement("div");
    let p = document.createElement("h1");
    let p2 = document.createElement("p");
    let p3 = document.createElement("p");
    let deleteBtn = document.createElement("button");
    let editBtn = document.createElement("button");
    div.className = "box2";
    p.textContent = i.first_name;
    p2.textContent = i.last_name;
    p3.textContent = i.email;
    deleteBtn.textContent = "Delete";
    editBtn.textContent = "Edit";
    deleteBtn.className = "delete-user";
    editBtn.className = "edit-user";
    deleteBtn.id = i.id;
    editBtn.id = i.id;
    deleteBtn.onclick = deleteUser;
    editBtn.onclick = editUser;
    div.append(p, p2, p3, deleteBtn, editBtn);
    box.append(div);
  }
};

function deleteUser(e) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == e.target.id) {
      users.splice(i, 1);
    }
  }
  render();
}

function editUser(e) {
  modal.style.display = "flex";
  const user = users.find((item) => item.id === Number(e.target.id));
  if (user) {
    for (let i of inputsModal) {
      i.value = user[i.name];
    }
  }
  formModal.id = e.target.id;
}
formModal.addEventListener("submit", (e) => {
  e.preventDefault();
  const obj = {};
  inputsModal.forEach((item) => {
    obj[item.name] = item.value;
    item.value = "";
  });
  users = users.map((el) =>
    el.id === Number(e.target.id) ? { ...obj, id: Number(e.target.id) } : el
  );
  modal.style.display = "none";
  render();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const obj = {};
  inputs.forEach((item) => {
    obj[item.name] = item.value;
    item.value = "";
  });
  users.push({ ...obj, id: Date.now() });

  render();
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
