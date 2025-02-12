let solved = false;
let solvedEvent = addEventListener

const ac = new AbortController();

function timer(time, signal) {
    try {
        return new Promise(resolve => {
        setTimeout(() => { resolve({ AbortSignal: signal }) }, time*1000);
        });
    } catch (e) {
        if(e.name !== 'AbortError') throw e;
    }
};

async function typeWrite(text, element, time) {
    for (let i = 0; i < text.length; i++) {
        element.textContent += text.charAt(i)
        await timer(time);
    }

    return "finished";
};

async function modifiedTypeWrite(text, element, time) {
    element.textContent = "_".repeat(text.length);
    for (let i = 0; i <= text.length; i++) {
        let newString = element.textContent.substring(0, i) + text.charAt(i) + element.textContent.substring(i, text.length)
        element.textContent = newString
        await timer(time);
    }

    return "finished";
};


window.onload = async () => {
    await timer(1.5);

    let openingText = document.getElementById("openingText");
    await typeWrite("hey again baby ;)", openingText, 0.15);
    
    await timer(0.5);

    createPasswordBox();

    await timer(5, ac.signal);
    
    if (solved === false) {
        needAHint();
    }

    imageRotate();
}

function buttonOnclick () {
    const passwordDisplay = document.getElementById("passwordDisplay")
    passwordDisplay.value += this.id
}

const backspace = () => {
    const passwordDisplay = document.getElementById("passwordDisplay")
    let value = passwordDisplay.value.toString()
    if (value.length === 0) { return; }

    passwordDisplay.value = value.substring(0, value.length - 1);
}

const enter = async () => {
    const passwordDisplay = document.getElementById("passwordDisplay");
    let value = passwordDisplay.value.toString();

    if (value !== "147000") {
        passwordDisplay.animate([
            { transform: "translateX(0)" },
            { transform: "translateX(2px)" },
            { transform: "translateX(-2px)" },
            { transform: "translateX(2px)" },
            { transform: "translateX(-2px)" },
            { transform: "translateX(2px)" },
            { transform: "translateX(-2px)" },
            { transform: "translateX(2px)" },
            { transform: "translateX(0)" }
        ],

        {
            duration: 500,
        });
    }

    else {
        ac.abort()
        const passwordScreen = document.getElementById("passwordScreen");
        passwordScreen.remove()
        try {
            const needAhint = document.getElementById("needAHint");
            const hintQuestion = document.getElementById("hintQuestion");
            needAhint.remove();
            hintQuestion.remove();
        } catch(e) {}

        solved = true;
        let openingText = document.getElementById("openingText");
        openingText.textContent = "";
        await typeWrite("good job baby, i'm so proud of you <3", openingText, 0.1);
        await timer(2.5);
        await modifiedTypeWrite("i hope you love this website so far. <3", openingText, 0.1);
        await timer(2.5);
        await modifiedTypeWrite("it took a lot of effort making this", openingText, 0.1);
        await modifiedTypeWrite("the way it is right now, but it's worth it", openingText, 0.1);
        await modifiedTypeWrite("all to see you smile; honey. <3", openingText, 0.1);
        await timer(2.5);
        await modifiedTypeWrite("i love you so much, and i want to spend my life with you.", openingText, 0.1);
        await modifiedTypeWrite("i also hope to add a lot more photos to the ones that're", openingText, 0.1);
        await modifiedTypeWrite("currently flashing right now.", openingText, 0.1);
        await timer(3);
        await modifiedTypeWrite("you are my valentine now, by the way. ;)", openingText, 0.1);

        const buttonOneYes = document.createElement("button");
        const buttonTwoYes = document.createElement("button");

        buttonOneYes.textContent = "yes";
        buttonTwoYes.textContent = "yes";

        buttonOneYes.onclick = yes
        buttonTwoYes.onclick = yes

        const buttonDiv = document.createElement("div");
        buttonDiv.id = "buttonDiv";

        buttonDiv.appendChild(buttonOneYes);
        buttonDiv.appendChild(buttonTwoYes);
        document.getElementById("openingContainer").appendChild(buttonDiv);
    }
}

const yes = async () => {
    let openingText = document.getElementById("openingText");
    await modifiedTypeWrite("good girl. no other options but me.", openingText, 0.1);
    await modifiedTypeWrite("i love you so much, happy valentine's day love ♥", openingText, 0.1);
}

const createPasswordBox = async () => {
    const passwordScreen = document.createElement("div");
    const passwordDisplay = document.createElement("input");
    const passwordInput = document.createElement("div");

    passwordScreen.id = "passwordScreen";
    passwordDisplay.id = "passwordDisplay";
    passwordInput.id = "passwordInput";

    passwordDisplay.setAttribute("disabled", true)

    for (let i = 0; i <= 11; i++) {
        const button = document.createElement("button");
        button.className = `button button${i}`
        button.id = i
        button.textContent = i <= 9 ? i : i == 10 ? "backspace" : "enter"
        button.onclick = i <= 9 ? buttonOnclick : i == 10 ? backspace : enter
        passwordInput.appendChild(button);
    }

    passwordScreen.appendChild(passwordDisplay);
    passwordScreen.appendChild(passwordInput);
    
    const openingContainer = document.getElementById("openingContainer");
    openingContainer.appendChild(passwordScreen);
}

const openPopupOne = () => {
    const popup = document.getElementById("answerOnePopup");
    popup.classList.toggle("show");
}

const openPopupTwo = () => {
    const popup = document.getElementById("answerTwoPopup");
    popup.classList.toggle("show");
}

const needAHint = () => {
    const needAHint = document.createElement("div");

    const answerOneDiv = document.createElement("div");
    const answerTwoDiv = document.createElement("div");

    const answerOnePopup = document.createElement("span");
    const answerTwoPopup = document.createElement("span");

    const answerOne = document.createElement("button");
    const answerTwo = document.createElement("button");
    const para = document.createElement("p");

    const answerOneSpanDiv = document.createElement("div");
    const answerTwoSpanDiv = document.createElement("div");

    const pOne = document.createElement("p");
    const pTwo = document.createElement("p");
    
    answerOneDiv.id = "answerOneDiv";
    answerTwoDiv.id = "answerTwoDiv";

    answerOnePopup.id = "answerOnePopup";
    answerTwoPopup.id = "answerTwoPopup";

    answerOneDiv.classList.add("popup");
    answerTwoDiv.classList.add("popup");

    answerOnePopup.classList.add("popuptext");
    answerTwoPopup.classList.add("popuptext");

    answerTwoPopup.id = "answerTwoPopup"
    
    para.id = "hintQuestion";
    answerOne.id = "answerOne";
    answerTwo.id = "answerTwo";
    needAHint.id = "needAHint";

    answerOne.onclick = openPopupOne;
    answerTwo.onclick = openPopupTwo;

    answerOnePopup.appendChild(answerOneSpanDiv);
    answerTwoPopup.appendChild(answerTwoSpanDiv);
    
    answerOneDiv.appendChild(answerOne);
    answerOneDiv.appendChild(answerOnePopup);

    answerTwoDiv.appendChild(answerTwo);
    answerTwoDiv.appendChild(answerTwoPopup);

    answerOneSpanDiv.appendChild(pOne);
    answerTwoSpanDiv.appendChild(pTwo);

    needAHint.appendChild(answerOneDiv);
    needAHint.appendChild(answerTwoDiv);

    para.textContent = "need a hint?"
    answerOne.innerHTML = "yes";
    answerTwo.innerHTML = "no";

    pOne.textContent = "think of our number, then multiply it by 1000. (1000 isn't enough to show my love for you) :)"
    pTwo.textContent = "of course you do, silly girl"

    const openingContainer = document.getElementById("openingContainer");
    openingContainer.appendChild(para);
    openingContainer.appendChild(needAHint);
}

async function changeImage (image, src, limit, time, iterations = 0) {
    if (iterations >= limit) return;
    iterations += 1
    image.src = src[Math.floor(Math.random() * src.length)];
    console.log(image.src)
    await timer(time);
    changeImage(image, src, limit, time, iterations);
}

const imageRotate = async () => {
    await new Promise((resolve, reject) => {
        const loop = () => {
            console.log(solved)
            solved ? resolve(solved) : setTimeout(loop, 2000) 
        }
        loop();
    });

    await timer(2.5);

    const imagesArr = ["https://drive.google.com/thumbnail?id=1ZPxVyXvwPuiP5R8dSo0o2xGiQVxAnz2c", 
        "https://drive.google.com/thumbnail?id=1iPa29aidg4lNCqXtpjG_C8NvLRjzmd6n",
        "https://drive.google.com/thumbnail?id=13rtv-RLkhHk4Aenx6nIbHZCDv1L5t9YK", 
        "https://drive.google.com/thumbnail?id=1LJQ4dIyZCMOqY3Eemi8XwwdWY6QngBPG", 
        "https://drive.google.com/thumbnail?id=1li0eVjwMMFeN5bH2wFOAJp4jxthKrOIw", 
        "https://drive.google.com/thumbnail?id=1yUVhmGpBEWxxSJGdvr8YFqCJ1bwCgwHj", 
        "https://drive.google.com/thumbnail?id=1V2CdXAKXnEgSvla2dPR-t5TpUxSHGNeq",  
        "https://drive.google.com/thumbnail?id=1mGFVeOapCUl6YMCUu-yaNYJ7Tqv0h3qV", 
        "https://drive.google.com/thumbnail?id=17nnPuyWI1yp4D7gsdtZVhC9bZ6NVBzKf" ];

    const display = document.createElement("img");
    display.id = "imagesDisplay";
    display.style.height = "100%";
    display.style.width = "100%";
    display.style.maxHeight = "500px";
    display.style.maxWidth = "1000px";
    display.style.objectFit = "contain";
    display.src = imagesArr[Math.floor(Math.random() * imagesArr.length)];
    console.log("hey", display.src)
    const openingContainer = document.getElementById("openingContainer")
    openingContainer.appendChild(display)
    await timer(0.65);
    changeImage(display, imagesArr, 100, 0.65);
}