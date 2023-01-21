// start
const rootEle = document.querySelector('div[id="__next"]');

// button
let expoButton = document.createElement('button');

expoButton.classList.add('gpt2markdown-export', 'font-medium', 'ml-1', 'md:ml-0', 'mt-0', 'md:mt-3', 'flex', 'items-center', 'justify-center', 'gap-2', 'text-sm', 'rounded-md', 'py-2', 'px-3', 'btn-primary')
expoButton.innerHTML = `
    <span><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-export" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
    <path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3"></path>
    </svg></span>
    <span>GPT 2 Markdown</span>
    `;
inputActionNode = document.querySelector("div[class*='relative flex h-full flex-1 md:flex-col']");
inputActionNode.appendChild(expoButton)
expoButton.addEventListener('click', handleClick);

window.onload = () => {

    const rootEle = document.querySelector('div[id="__next"]');
    updateUI();

    new MutationObserver(() => {
        try {
            updateUI();
        } catch (err) {
            console.info("GPT2Markdown err found: Could not update the UI\n", err.stack)
        }
    }).observe(rootEle, {
        childList: true
    })
}


// footer
var bottom = document.querySelector("div[class*='absolute bottom-0']");
let footer = document.createElement('div')

let extension_version = chrome.runtime.getManifest().version;
footer.innerHTML = `<a href='https://github.com/0xreeko/gpt2markdown' target='_blank' class='underline text-white'>GPT2Markdown extension v.${extension_version}</a>. If you like the extension, please consider following me <a href='https://twitter.com/intent/follow?screen_name=emergingtechguy' target='_blank' class='underline text-white'>@EmergingTechGuy</a> on Twitter.`;

let lastEle = bottom.lastElementChild;
lastEle.appendChild(footer);


// functions
function handleClick() {
    setTimeout(() => {
        // Show a message to the user that the text has been copied to the clipboard
        alert(`[GPT2Markdown]: « ${(document.querySelector(".pr-14.bg-gray-800")?.innerText)} » successfully exported!`);

        const e = document.querySelectorAll(".text-base");
        let t = "";
        for (const s of e) s.querySelector(".whitespace-pre-wrap") && (t += t == "" ? "" : "--------\n", t += `**${s.querySelectorAll('img').length > 1 ? 'You' : 'ChatGPT'}**: ${(s.querySelector(".whitespace-pre-wrap").innerHTML)}\n\n`);
        const o = document.createElement("a");
        o.download = (document.querySelector(".pr-14.bg-gray-800")?.innerText || "Conversation with ChatGPT") + ".md", o.href = URL.createObjectURL(new Blob([t])), o.style.display = "none", document.body.appendChild(o), o.click()
    }, 500);
}

function updateUI() {

    textarea = document.querySelector('textarea')
    if (!textarea) return

    existingButton = document.querySelector('.gpt2markdown-export')
    if (!existingButton) {
        let expoButton = document.createElement('button');

        expoButton.classList.add('gpt2markdown-export', 'font-medium', 'ml-1', 'md:ml-0', 'mt-0', 'md:mt-3', 'flex', 'items-center', 'justify-center', 'gap-2', 'text-sm', 'rounded-md', 'py-2', 'px-3', 'btn-primary')
        expoButton.innerHTML = `<span><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-export" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
    <path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3"></path>
    </svg></span>
    <span>GPT 2 Markdown</span>
    `;
        inputActionNode = document.querySelector("div[class*='relative flex h-full flex-1 md:flex-col']");
        inputActionNode.appendChild(expoButton)
        expoButton.addEventListener('click', handleClick);
    }
}