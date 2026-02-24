# JS DOM & Events

okay so I kept getting confused about these DOM and event stuff during practice, so I just made this little note for myself. maybe it'll help someone else too, who knows.

---

## 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

honestly took me a while to get this straight. here's what I figured out:

- `getElementById` — you know the ID of the element, just use this. simple and fast.
- `getElementsByClassName` — gives you back a bunch of elements with that class. returns a live HTMLCollection which is kinda weird at first but okay.
- `querySelector` — this one's my favorite. you can use any CSS selector and it just grabs the first match.
- `querySelectorAll` — same thing but grabs everything that matches, not just the first one.

```js
document.getElementById("header");         // just the one with that id
document.getElementsByClassName("card");   // all elements with class "card"
document.querySelector(".card");           // first .card it finds
document.querySelectorAll(".card");        // all of them
```

I mostly just use `querySelector` and `querySelectorAll` now for everything. they're flexible and I don't have to think too much.

---

## 2. How do you create and insert a new element into the DOM?

this one's actually pretty straightforward once you do it a couple times.

```js
const newDiv = document.createElement("div");
newDiv.textContent = "hello I'm new here";
newDiv.classList.add("box");

const container = document.getElementById("container");
container.appendChild(newDiv);
```

create it, set it up, then append it. that's it. took me way longer to understand than it should have lol.

---

## 3. What is Event Bubbling? And how does it work?

okay so this one confused me at first. basically when you click something, that click event doesn't just stay there — it travels up through all the parent elements.

```html
<div id="grandparent">
  <div id="parent">
    <button id="btn">click me</button>
  </div>
</div>
```

```js
document.getElementById("btn").addEventListener("click", () => {
  console.log("button clicked");
});

document.getElementById("parent").addEventListener("click", () => {
  console.log("parent fired too??");
});
```

yeah, clicking the button fires both. the event bubbles up. I was so confused the first time this happened to me debugging something 😅

---

## 4. What is Event Delegation in JavaScript? Why is it useful?

so once you understand bubbling, delegation makes total sense. instead of adding a listener to every single child element, you just add one to the parent and let it catch everything.

```js
document.getElementById("myList").addEventListener("click", function(e) {
  if (e.target.tagName === "LI") {
    console.log("you clicked:", e.target.textContent);
  }
});
```

the reason I like this — if you dynamically add new list items later, they automatically work too. no need to re-attach listeners every time. saved me a lot of headache honestly.

---

## 5. What is the difference between preventDefault() and stopPropagation() methods?

these two look similar but do very different things. I mixed them up a few times.

`preventDefault` — stops the browser from doing its default thing. like stopping a form from actually submitting, or stopping a link from navigating away.

```js
form.addEventListener("submit", function(e) {
  e.preventDefault();
  // now I can handle the form data myself
});
```

`stopPropagation` — stops the event from bubbling up. so parent elements won't know the event happened.

```js
document.getElementById("btn").addEventListener("click", function(e) {
  e.stopPropagation();
  // the click stops here, parent won't fire
});
```

the way I remember it — `preventDefault` is about stopping the **browser action**, `stopPropagation` is about stopping the **event from traveling**.
