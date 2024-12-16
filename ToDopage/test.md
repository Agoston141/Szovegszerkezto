# To-Do Alkalmazás Dokumentáció

## 1. Specifikáció

**Cél**: A "To-Do" alkalmazás célja, hogy a felhasználók könnyedén rögzíthessék és kezelhessék napi feladataikat.

**Funkciók**:

- **Feladatok hozzáadása**: A felhasználók új feladatokat adhatnak hozzá egy szövegmező segítségével.
- **Feladatok listázása**: A megadott feladatok megjelennek egy listában, ahol a felhasználók bejelölhetik őket.
- **Billentyűparancs támogatás**: A felhasználók az Enter billentyű lenyomásával is hozzáadhatnak új feladatokat.

---

## 2. Felhasználói útmutató

### **Alapvető Működés**

1. Írjon be egy új feladatot a "Új feladat" mezőbe.
2. Kattintson a **"+"** gombra, vagy nyomja meg az **Enter** billentyűt a feladat hozzáadásához.
3. A hozzáadott feladat megjelenik a listában, ahol bejelölheti, ha a feladatot elvégezte.

---

## 3. Fejlesztői útmutató

### **Felépítés**

- **index.html**: Az alkalmazás felületét meghatározó HTML fájl.
- **todo.css**: Az alkalmazás megjelenését szabályozó stíluslap.
- **todo.js**: A JavaScript kód, amely az alkalmazás működéséért felelős.

### **Főbb Funkciók a `todo.js`-ben**

- **Feladat hozzáadása**:

  ```javascript
  document.getElementById('add-task-btn').addEventListener('click', function() {
      const taskInput = document.getElementById('new-task-input');
      const taskText = taskInput.value.trim();

      if (taskText !== "") {
          const newTask = document.createElement('li');
          newTask.innerHTML = `<input type="checkbox"> ${taskText}`;
          document.getElementById('todo-items').appendChild(newTask);
          taskInput.value = '';
      }
  });
  ```
- **Enter billentyű támogatása**:

  ```javascript
  document.getElementById('new-task-input').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
          document.getElementById('add-task-btn').click();
      }
  });
  ```

---

## 4. Tesztelési Dokumentáció

### **Javasolt Jasmine Tesztesetek**

#### **Task Manager Tesztek**

```javascript
describe('Task Manager', function() {
    let addTaskButton;
    let taskInput;
    let todoItems;

    beforeEach(function() {
        document.body.innerHTML = `
            <input id="new-task-input" type="text">
            <button id="add-task-btn">Add Task</button>
            <ul id="todo-items"></ul>
        `;
     
        addTaskButton = document.getElementById('add-task-btn');
        taskInput = document.getElementById('new-task-input');
        todoItems = document.getElementById('todo-items');

        addTaskButton.addEventListener('click', function() {
            const taskText = taskInput.value.trim();
            if (taskText !== "") {
                const newTask = document.createElement('li');
                newTask.innerHTML = `<input type="checkbox"> ${taskText}`;
                todoItems.appendChild(newTask);
                taskInput.value = '';
            }
        });

        taskInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTaskButton.click();
            }
        });
    });

    it('should add a task to the list when the button is clicked', function() {
        taskInput.value = 'Test Task';
        addTaskButton.click();
        expect(todoItems.children.length).toBe(1);
        expect(todoItems.children[0].textContent.trim()).toBe('Test Task');
    });

    it('should clear the input after adding a task', function() {
        taskInput.value = 'Another Task';
        addTaskButton.click();
        expect(taskInput.value).toBe('');
    });

    it('should not add a task if the input is empty', function() {
        taskInput.value = '  ';
        addTaskButton.click();
        expect(todoItems.children.length).toBe(0);
    });

    it('should add a task when Enter key is pressed', function() {
        taskInput.value = 'Enter Task';
        const event = new KeyboardEvent('keypress', { key: 'Enter' });
        taskInput.dispatchEvent(event);
        expect(todoItems.children.length).toBe(1);
        expect(todoItems.children[0].textContent.trim()).toBe('Enter Task');
    });
});
```

---

### Tesztelési Dokumentáció Formátuma


| Funkció                     | Bemenet                | Várt eredmény                      | Tényleges eredmény | Státusz |
| ---------------------------- | ---------------------- | ------------------------------------ | -------------------- | -------- |
| Feladat hozzáadása         | `"Test Task"` szöveg  | Új feladat megjelenik a listában   |                      |          |
| Üres mező kezelése        | `"  "` üres bemenet   | Nem kerül hozzáadásra új feladat |                      |          |
| Enter billentyű működése | `"Enter Task"` szöveg | Új feladat megjelenik a listában   |                      |          |

---
