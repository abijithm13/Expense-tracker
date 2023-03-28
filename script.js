const balance = document.getElementById("balance");
const addMoney = document.getElementById("add-money");
const reduceMoney = document.getElementById("reduce-money");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const dummyTransactions = [
    { id: 1, text: "Rent", amount: -5000 },
    { id: 2, text: "Salary", amount: 30000 },
    { id: 3, text: "food", amount: -10000 },
    { id: 4, text: "cloths", amount: -5000 },
];

let transactions = dummyTransactions;

function showNotification() {
    notification.classList.add("show");
    setTimeout(() => {
    notification.classList.remove("show");
    }, 2000);
}

function generateID() {
    return Math.floor(Math.random() * 100000000);
}

function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() === "" || amount.value.trim() === "") {
    showNotification();
    } else {
    const transaction = {
        id: generateID(),
        text: text.value,
        amount: +amount.value,
    };
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    text.value = "";
    amount.value = "";
    }
}

function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");
    item.classList.add(sign === "+" ? "plus" : "minus");
    item.innerHTML = `
            ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span
            ><button class="delete-btn" onclick="removeTransaction(${
            transaction.id
            })"><i class="fa fa-times"></i></button>
    `;
    list.appendChild(item);
}

function updateValues() {
    const amounts = transactions.map((transaction) => transaction.amount);
    const total = amounts
    .reduce((accumulator, value) => (accumulator += value), 0)
    .toFixed(2);
    const income = amounts
    .filter((value) => value > 0)
    .reduce((accumulator, value) => (accumulator += value), 0)
    .toFixed(2);
    const expense = (
    amounts
        .filter((value) => value < 0)
        .reduce((accumulator, value) => (accumulator += value), 0) * -1
    ).toFixed(2);
    balance.innerText = `₹${total}`;
    addMoney.innerText = `₹${income}`;
    reduceMoney.innerText = `₹${expense}`;
}

function removeTransaction(id) {
    transactions = transactions.filter((transaction) => transaction.id !== id);

    init();
}


function init() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener("submit", addTransaction);