const balance = document.getElementById(
    'balance'
);
const credit = document.getElementById(
    'money-1'
);
const debit = document.getElementById(
    'money-2'
);
const list = document.getElementById(
    'list'
);
const form = document.getElementById(
    'form'
);
const text = document.getElementById(
    'text'
);
const amount = document.getElementById(
    'amt'
);


const localStorageTransactions = JSON.parse(localStorage.getItem('items'));

let items = localStorage.getItem("items") !== null ? localStorageTransactions : [];


// add items
function addTransaction(e) {
    e.preventDefault();
    if (
        text.value.trim() === "" || amount.value.trim() === ''
    ) {
        alert("please enter text and value");
    } else {
        const Item = {
            id: generateId(),
            text: text.value,
            amount: +amount.value
        };
        items.push(Item);

        addItem(Item);
        updateValues();
        updateStorage();
        text.value = '';
        amount.value = '';
    }
}


//generating random id for items
function generateId() {
    return Math.floor(Math.random() * 1000000000);
}

function addItem(Item) {
    console.log(Item);
    const sign = Item.amount < 0 ? "-" : "+";
    const itemlist = document.createElement("li");
    itemlist.classList.add(
        Item.amount < 0 ? "debit1" : "credit1"
    );

    itemlist.innerHTML =
        `${Item.text} <span>${sign}${Math.abs(
            Item.amount
        )}</span>
        <button class="delete-btn" onclick="removeItem(${Item.id})">X</button></>
    `;
    list.appendChild(itemlist);

}

//Update values for credit and debit
function updateValues() {
    const amt1 = items.map((Item) => Item.amount);
    const total = amt1.reduce((acc, itemlist) => (acc += itemlist), 0).toFixed(2);
    const income = amt1
        .filter((itemlist) => itemlist > 0)
        .reduce((acc, itemlist) => (acc += itemlist), 0)
        .toFixed(2);
    // const income = amt1.filter((itemlist) => itemlist < 0).reduce((acc, itemlist) => (acc += itemlist));
    const expense =
        (amt1
            .filter((itemlist) => itemlist < 0).reduce((acc, itemlist) => (acc += itemlist), 0) * -1).toFixed(2);
    balance.innerText = `$${total}`;
    credit.innerText = `$${income}`;
    debit.innerText = `$${expense}`;

}

// remove item
function removeItem(id) {
    items = items.filter(Item => Item.id !== id);
    updateStorage();
    Init();
}

//updating local storage
function updateStorage() {
    localStorage.setItem('items', JSON.stringify(items));
}

//Init app
function Init() {
    list.innerHTML = "";
    items.forEach(addItem);
    updateValues();
}


Init();
form.addEventListener('submit', addTransaction);