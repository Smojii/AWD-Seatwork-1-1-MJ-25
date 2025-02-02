let currentBalance = parseFloat(localStorage.getItem("balance")) || 5000;
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const balanceElement = document.getElementById("balance");
const amountInput = document.getElementById("amount");
const transactionList = document.getElementById("transaction-list");
const depositButton = document.getElementById("deposit");
const withdrawButton = document.getElementById("withdraw");

function updateBalanceDisplay() {
    balanceElement.textContent = currentBalance.toFixed(2);
    localStorage.setItem("balance", currentBalance);
}

function updateTransactionList() {
    transactionList.innerHTML = "";
    transactions.forEach(transaction => {
        const listItem = document.createElement("li");
        listItem.textContent = `${transaction.type}: ₱${transaction.amount.toFixed(2)}`;
        transactionList.appendChild(listItem);
    });
}

function addTransaction(type, amount) {
    const transaction = { type, amount };
    transactions.unshift(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateTransactionList();
}

function handleDeposit() {
    const amount = parseFloat(amountInput.value);
    if (!isNaN(amount) && amount > 0) {
        currentBalance += amount;
        updateBalanceDisplay();
        addTransaction("Deposit", amount);
        amountInput.value = "";
    } else {
        alert("Please enter a valid amount to deposit.");
    }
}

function handleWithdraw() {
    const amount = parseFloat(amountInput.value);
    if (!isNaN(amount) && amount > 0) {
        if (amount <= currentBalance) {
            currentBalance -= amount;
            updateBalanceDisplay();
            addTransaction("Withdraw", amount);
            amountInput.value = "";
        } else {
            alert("Insufficient balance for this withdrawal.");
        }
    } else {
        alert("Please enter a valid amount to withdraw.");
    }
}

depositButton.addEventListener("click", handleDeposit);
withdrawButton.addEventListener("click", handleWithdraw);

updateBalanceDisplay();
updateTransactionList();