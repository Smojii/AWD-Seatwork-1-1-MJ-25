let currentBalance = 5000;

const balanceElement = document.getElementById("balance");
const amountInput = document.getElementById("amount");
const transactionList = document.getElementById("transaction-list");
const depositButton = document.getElementById("deposit");
const withdrawButton = document.getElementById("withdraw");

function updateBalanceDisplay() {
    balanceElement.textContent = currentBalance.toFixed(2);
}

function addTransaction(type, amount) {
    const listItem = document.createElement("li");
    listItem.textContent = `${type}: ₱${amount.toFixed(2)}`;
    transactionList.insertBefore(listItem, transactionList.firstChild); // Add to the top of the list
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