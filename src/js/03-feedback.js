import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = "feedback-form-state";

const form = document.querySelector(".feedback-form");
const input = document.querySelector(".js-input");
const message = document.querySelector(".js-message");

form.addEventListener("input", throttle(onFormInput, 500))
form.addEventListener("submit", onFormSubmit)
const storageValue = {}

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};


if (!localStorage.getItem(LOCALSTORAGE_KEY)) {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(storageValue));
}

if (load(LOCALSTORAGE_KEY).email) {
    //console.log(form.firstElementChild);
    input.value = load(LOCALSTORAGE_KEY).email;
}
if (load(LOCALSTORAGE_KEY).message) {
    //console.log(form.firstElementChild);
    message.value = load(LOCALSTORAGE_KEY).message;
}

function onFormSubmit(e) {
    e.preventDefault();
    console.log("Відправлення форми");
    console.log("Email: ", input.value);
    console.log("Message: ", message.value);
    input.value = "";
    message.value = "";
    localStorage.removeItem(LOCALSTORAGE_KEY)
}

function onFormInput(e) {
    
    storageValue[e.target.name] = e.target.value;
    //save(LOCALSTORAGE_KEY, JSON.stringify(storageValue))

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(storageValue));
    // storageValue[e.target.name] = e.target.value;

    // if (e.target.name === "email") {
    //     storageValue.email = e.target.value;
    //     save(LOCALSTORAGE_KEY, JSON.stringify(storageValue))
    //     console.log(JSON.stringify(storageValue));
    // } else if (e.target.name === "message") {
    //     storageValue.message = e.target.value;
    //     save(LOCALSTORAGE_KEY, JSON.stringify(storageValue))
    //     console.log(JSON.stringify(storageValue));
    // }
    //console.log(storageValue);
}

//console.log(email);