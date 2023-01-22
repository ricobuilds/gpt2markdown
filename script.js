// retrieve the button element from local storage
let storedButton = sessionStorage.getItem("gptToMDButton");

// check if the button element is stored in local storage
if (storedButton) {
    // create a new button element from the stored string
    let expoButton = document.createElement('button');
    expoButton.innerHTML = `${storedButton}`;

    // append the button element to the DOM
    inputActionNode = document.querySelector("div[class*='relative flex h-full flex-1 md:flex-col']");
    inputActionNode.appendChild(expoButton);

    // add click event listener to the button
    expoButton.addEventListener('click', handleClick);
}

// retrieve the footer element from local storage
let storedFooter = sessionStorage.getItem("gptToMDFooter");

// check if the footer element is stored in local storage
if (storedFooter) {
    // create a new footer element from the stored string
    let footer = document.createElement('div');
    footer.innerHTML = `${storedFooter}`;

    // append the footer element to the DOM
    var bottom = document.querySelector("div[class*='absolute bottom-0']");
    let lastEle = bottom.lastElementChild;
    lastEle.appendChild(footer);
}

// observer to check when the chat conversation changes
const rootEle = document.querySelector('div[id="__next"]');
window.onload = () => {
    new MutationObserver(() => {
        updateUI();
    }).observe(rootEle, {
        childList: true,
        subtree: true
    });
};

window.onhashchange = function () {
    // check if the hash fragment contains the conversation identifier
    if (location.hash.includes('chat/')) {
        //re-append the elements stored in session storage
        updateUI();
    }
}


// function to update the UI
function updateUI() {
    // retrieve the button element from local storage
    let storedButton = sessionStorage.getItem("gptToMDButton");
    // check if the button element is stored in local storage
    if (storedButton) {
        // create a new button element from the stored string
        expoButton.innerHTML = `${storedButton}`;

        // append the button element to the DOM
        inputActionNode.appendChild(expoButton);

        // add click event listener to the button
        expoButton.addEventListener('click', handleClick);
    }

    // retrieve the footer element from local storage
    let storedFooter = sessionStorage.getItem("gptToMDFooter");
    // check if the footer element is stored in local storage
    if (storedFooter) {
        // create a new footer element from the stored string
        footer.innerHTML = `${storedFooter}`;

        // append the footer element to the DOM
        lastEle.appendChild(footer);
    }
}

function handleClick() {
    // Show a message to the user that the text has been copied to the clipboard
    alert(`[GPT2Markdown]: « ${(document.querySelector(".pr-14.bg-gray-800")?.innerText)} » successfully exported!`);

    const e = document.querySelectorAll(".text-base");
    let t = "";
    for (const s of e) s.querySelector(".whitespace-pre-wrap") && (t += t == "" ? "" : "--------\n", t += `**${s.querySelectorAll('img').length > 1 ? 'You' : 'ChatGPT'}**: ${(s.querySelector(".whitespace-pre-wrap").innerHTML)}\n\n`);
    const o = document.createElement("a");
    o.download = (document.querySelector(".pr-14.bg-gray-800")?.innerText || "Conversation with ChatGPT") + ".md", o.href = URL.createObjectURL(new Blob([t])), o.style.display = "none", document.body.appendChild(o), o.click()
}