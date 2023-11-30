/********* CORE LOGIC *********/

class Transaction {
    constructor(text, amount, type, date) {
        this.text = text;
        this.amount = amount;
        this.type = type;
        this.date = date;
    }
}

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction(transaction) {
    transactions.push(transaction);
    updateLS();
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateLS();
}

function calcTotal(type) {
    return transactions?.reduce((total, item) => {
        return item.type === type ? total + item.amount : total;
    }, 0);
}

function updateLS() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

/********* UI *********/

const d = document,
      textInput = d.querySelector(".transaction-text"),
      amountInput = d.querySelector(".transaction-number"),
      addBtn = d.querySelector(".add"),
      historyEl = d.querySelector(".history");

let balanceEl = d.querySelector(".balance"),
    incomeEl = d.querySelector(".income"),
    expenseEl = d.querySelector(".expense");

updateUI();

addBtn.addEventListener("click", () => {
    let text = textInput.value;
    let amount = parseInt(amountInput.value);
    let type = amount > 0 ? "income" : "expense";
    let newTransaction = new Transaction(text, amount > 0 ? amount : -amount, type, new Date())

    addTransaction(newTransaction);
    addTransactionUI(newTransaction);
    updateTotals();
    cleanInputs();
});

function updateTotals() {
    let totalIncome = calcTotal("income");
    let totalExpense = calcTotal("expense");
    let balance = totalIncome - totalExpense;

    balanceEl.innerText = balance;
    incomeEl.innerText = totalIncome;
    expenseEl.innerText = totalExpense;
}

function addTransactionUI(transaction) {
    let transactionEl = d.createElement("div");
    transactionEl.classList.add("transaction");

    let transactionP = d.createElement("p");
    transactionP.innerText = transaction.text + " ";

    let transactionSpan = d.createElement("span");
    transactionSpan.innerText = transaction.amount + " ";

    let deleteBtn = d.createElement("button");
    deleteBtn.innerText = "delete";
    deleteBtn.classList.add("delete");

    deleteBtn.addEventListener("click", () => {
        transactionEl.remove();
        deleteTransaction(transactions.indexOf(transaction));
        updateTotals();
    });

    transactionP.append(transactionSpan, deleteBtn);
    transactionEl.appendChild(transactionP);
    historyEl.appendChild(transactionEl);
}

function updateUI() {
    updateTotals();

    transactions?.forEach(transaction => {
        if (transaction) addTransactionUI(transaction);
    });
}

function cleanInputs() {
    textInput.value = "";
    amountInput.value = "";
}
