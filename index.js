let cardId = 1;
let listItemId = 1;
let cardLinkValue = 1;

const appHeader = document.getElementById('app_header');
const tasksContainer = document.getElementById('tasks_container');
const cardNameEle = document.getElementById('cardName');

function addItem() {
    const addItemBtn = document.getElementById('add_item_btn');
    addItemBtn.addEventListener("click", function () {
        document.getElementById('todo_popup').style.display = "block";
        document.getElementById('main-section').style.filter = "blur(7px)";
        document.getElementById('main-section').style.webkitFilter = "blur(7px)";
    })
}
addItem();

function closeAddItem() {
    const closeAddItem_btn = document.getElementById('Cancel_todo_item_btn');
    closeAddItem_btn.addEventListener("click", function () {
        document.getElementById('todo_popup').style.display = "none";
        document.getElementById('main-section').style.filter = "none";
        document.getElementById('main-section').style.webkitFilter = "none";
    })
}
closeAddItem();

function addToDOItem() {

    const addToDOItem_btn = document.getElementById('Add_todo_item_btn');
    const taskContainer = document.getElementById('tasks_container');
    addToDOItem_btn.addEventListener("click", function () {
        document.getElementById('todo_popup').style.display = "none";
        document.getElementById('main-section').style.filter = "none";
        document.getElementById('main-section').style.webkitFilter = "none";
        document.getElementById('no_list_text').innerText = " ";
        const toDoItemName = document.getElementById('toDoNameInput').value;
        const ele = document.createElement('div');
        ele.classList.add('todo_card');
        ele.setAttribute('id', `card${cardId}`);
        ele.innerHTML = `
          <div class="todo_header">
          <button class="cardLink" value=${cardId}>${toDoItemName}</button>
          </div>
          <hr>
          <div class="todo_body" id="cardBody${cardId}"></div>
            <div class="todo_btns">
              <button class="add_todo_list_btn" id="addItem-${cardId}" value=${cardId}>+</button>
              <button class="delete_todo_btn" id="deleteBtnContainer" value=${cardId} >
                <i class="fa-solid fa-trash-can" value=${cardId}></i>
              </button>
         </div>`;
        restoreHeader();
        restoreTasksContainer();
        taskContainer.appendChild(ele);
        cardId++;
    })

}
addToDOItem();

function addItemsToDoList() {
    const listItems = document.getElementById('listItem_popup');
    let id = 0;
    tasksContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains('add_todo_list_btn')) {
            document.getElementById('main-section').style.filter = "blur(8px)";
            document.getElementById('main-section').style.webkitFilter = "blur(8px)";
            const listItemName = document.getElementById('listItemInput').value;
            listItems.style.display = "block";
            id = e.target.value;
        }
        else if (e.target.classList.contains('fa-trash-can')) {
            let valueOfDeleteBtn = e.target.parentElement.value;
            const card = document.getElementById('card' + valueOfDeleteBtn);
            card.remove();
            restoreHeader();
            restoreTasksContainer();
        }
        else if (e.target.classList.contains('markDonebtn')) {
            let markDoneValue = e.target.value;
            document.getElementById('markdoneBtn' + markDoneValue).style.display = 'none';
            document.getElementById('listText' + markDoneValue).style.textDecoration = "line-through";
        }
        else if (e.target.classList.contains('cardLink')) {
            cardLinkValue = e.target.getAttribute('value');
            changeHeader();
            showCard(e.target.innerText);
        }
    })

    const addToDoList = document.getElementById('Add_list_item_btn');
    addToDoList.addEventListener("click", function () {
        document.getElementById('listItem_popup').style.display = "none";
        document.getElementById('main-section').style.filter = "none";
        document.getElementById('main-section').style.webkitFilter = "none";

        const listItemName = document.getElementById('listItemInput').value;
        const listItem = document.createElement('div');
        listItem.classList.add('listItem');
        let listItemContent = `
            <span id=listText${listItemId} class='listText'>${listItemName}</span>
            <button id=markdoneBtn${listItemId} class='markDonebtn' value=${listItemId}>Mark Done</button>
        `;
        listItem.innerHTML = listItemContent;
        listItems.style.display = "none";
        document.getElementById('cardBody' + id).append(listItem);
        listItemId++;
    })
}
addItemsToDoList();


function closeItemsToDoList() {
    const closeAddListItem_btn = document.getElementById('Cancel_list_item_btn');
    closeAddListItem_btn.addEventListener("click", function () {
        document.getElementById('listItem_popup').style.display = "none";
        document.getElementById('main-section').style.filter = "none";
        document.getElementById('main-section').style.webkitFilter = "none";
    })
}
closeItemsToDoList();

function taskContainerClick() {
    const tasksContainer = document.getElementById('tasks_container');
    tasksContainer.addEventListener("click", function () {

    })

}

function showCard(cardName) {
    let cards = document.getElementsByClassName('todo_card');
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].getAttribute('id') != 'card' + cardLinkValue) {
            cards[i].style.display = "none";
        }
    }
    tasksContainer.style.justifyContent = "center";
    tasksContainer.style.alignItems = "flex-start";
    document.getElementById('card' + cardLinkValue).classList.add('bigTodoCard');
    cardNameEle.style.display = "inline";
    cardNameEle.innerText = cardName;
}

function changeHeader() {
    document.getElementById('tasks_text').style.display = "none";
    document.getElementById('list_text').style.display = "none";
    document.getElementById('backBtn').style.display = "block";
}
function restoreHeader() {
    document.getElementById('tasks_text').style.display = "inline";
    document.getElementById('list_text').style.display = "inline";
    document.getElementById('backBtn').style.display = "none";
    cardNameEle.style.display = "none";
}

const backButton = document.getElementById('backBtn');
backButton.addEventListener("click", restoreTasksContainer);

function restoreTasksContainer() {
    let cards = document.getElementsByClassName('todo_card');
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.display = "block";
    }
    tasksContainer.style.justifyContent = "space-between";
    restoreHeader();
    try {
        document.getElementById('card' + cardLinkValue).classList.remove('bigTodoCard');
    }
    catch (error) {
        console.log("");
    }
}
