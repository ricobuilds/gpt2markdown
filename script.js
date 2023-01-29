// start
const markdownFormatter = {
    heading1: text => `# ${text}\n`,
    heading2: text => `## ${text}\n`,
    heading3: text => `### ${text}\n`,
    bold: text => `**${text}**`,
    italic: text => `_${text}_`,
    link: (text, url) => `[${text}](${url})`,
    bulletList: text => `- ${text}\n`,
    numberedList: text => ` ${text}\n`,
    codeBlock: text => `\`\`\`${text}\`\`\``,
    emoji: text => `:${text}:`, //
    blockquote: text => `> ${text}\n`,
    hr: () => `---\n`, //
    strikethrough: text => `~~${text}~~`,
    highlight: text => `==${text}==` //
}
const rootEle = document.querySelector('div[id="__next"]');
let innerText = document.querySelector('a[class="flex py-3 px-3 items-center gap-3 relative rounded-md cursor-pointer break-all pr-14 bg-gray-800 hover:bg-gray-800 group"]')?.innerText;

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
expoButton.addEventListener('load', () => console.log(document.querySelector(".pr-14.bg-gray-800")?.innerText))

const handleLiveChat = () => {
    setTimeout(() => {
        chatText = document.querySelector(".pr-14.bg-gray-800")?.innerText
        if (chatText) {
            console.log('exist!')
        } else {
            console.log('not exist!')
        }
    }, 500);
}

new MutationObserver(() => {
    handleStore();
}).observe(rootEle, {
    childList: true,
    subtree: true
})

var bottom = document.querySelector("div[class*='absolute bottom-0']");
let footer = document.createElement('div')

let extension_version = chrome.runtime.getManifest().version;
let extension_name = chrome.runtime.getManifest().name;
footer.innerHTML = `<a href='https://github.com/0xreeko/gpt2markdown' target='_blank' class='underline text-white'>${extension_name} extension v.${extension_version}</a>. If you like the extension, please consider following me <a href='https://twitter.com/intent/follow?screen_name=emergingtechguy' target='_blank' class='underline text-white'>@EmergingTechGuy</a> on Twitter.`;

let lastEle = bottom.lastElementChild;
lastEle.appendChild(footer);

function handleClick() {
    if (document.querySelector(".pr-14.bg-gray-800")?.innerText === undefined) return
    handleLiveChat()
    alert(`[GPT2Markdown]: « ${(document.querySelector(".pr-14.bg-gray-800")?.innerText)} » successfully exported!`)

    const e = document.querySelectorAll(".text-base");
    let t = "";
    for (const s of e) {
        if (s.querySelector(".whitespace-pre-wrap")) {
            t += t == "" ? "" : "--------\n"
            let innerHtml = s.querySelector(".whitespace-pre-wrap").innerHTML;
            let _heading1 = s.querySelectorAll('h1')
            _heading1.forEach(el => {
                innerHtml = innerHtml.replace(el.outerHTML, markdownFormatter.heading1(el.innerText))
            })
            let _heading2 = s.querySelectorAll('h2')
            _heading2.forEach(el => {
                innerHtml = innerHtml.replace(el.outerHTML, markdownFormatter.heading1(el.innerText))
            })
            let _heading3 = s.querySelectorAll('h3')
            _heading3.forEach(el => {
                innerHtml = innerHtml.replace(el.outerHTML, markdownFormatter.heading1(el.innerText))
            })
            let pElements = s.querySelectorAll('p')
            pElements.forEach(el => {
                innerHtml = innerHtml.replace(el.outerHTML, el.innerHTML)
            })
            let divElements = s.querySelectorAll("div[class*='markdown prose w-full break-words dark:prose-invert light']")
            divElements.forEach(el => {
                innerHtml = innerHtml.replace(el.outerHTML, el.textContent)
            })
            let boldElements = s.querySelectorAll("strong")
            boldElements.forEach(el => {
                innerHtml = innerHtml.replace(el.outerHTML, markdownFormatter.bold(el.innerText));
            });
            let italicElements = s.querySelectorAll("em")
            italicElements.forEach(el => {
                innerHtml = innerHtml.replace(el.outerHTML, markdownFormatter.bold(el.innerText));
            });
            let linkElements = s.querySelectorAll("a");
            linkElements.forEach(el => {
                innerHtml = innerHtml.replace(el.outerHTML, markdownFormatter.link(el.innerText, el.href));
            });
            let codeElements = s.querySelectorAll("code");
            codeElements.forEach(el => {
                innerHtml = innerHtml.replace(el.outerHTML, markdownFormatter.codeBlock(el.innerText));
            });
            let delElements = s.querySelectorAll('del')
            delElements.forEach(el => {
                innerHtml = innerHtml.replace(el.outerHTML, markdownFormatter.strikethrough(el.innerText))
            })
            let blockquoteElements = s.querySelectorAll('blockquote')
            blockquoteElements.forEach(el => {
                innerHtml = innerHtml.replace(el.outerHTML, markdownFormatter.blockquote(el.innerText))
            })

            t += `${markdownFormatter.bold(s.querySelectorAll('img').length > 1 ? 'You:' : 'ChatGPT:')} ${innerHtml}\n\n`
        }
    }
    const o = document.createElement("a");
    o.download = (document.querySelector(".pr-14.bg-gray-800")?.innerText || "Conversation with ChatGPT") + ".md", o.href = URL.createObjectURL(new Blob([t])), o.style.display = "none", document.body.appendChild(o), o.click()
}

function handleStore() {
    textarea = document.querySelector('textarea')
    if (!textarea) return

    existingButton = document.querySelector('.gpt2markdown-export')
    existingFooter = document.querySelector("div[class*='absolute bottom-0']");
    if (!existingButton || !existingFooter) {
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

        var bottom = document.querySelector("div[class*='absolute bottom-0']");
        let footer = document.createElement('div')

        let extension_version = chrome.runtime.getManifest().version;
        footer.innerHTML = `<a href='https://github.com/0xreeko/gpt2markdown' target='_blank' class='underline text-white'>${extension_name} extension v.${extension_version}</a>. If you like the extension, please consider following me <a href='https://twitter.com/intent/follow?screen_name=emergingtechguy' target='_blank' class='underline text-white'>@EmergingTechGuy</a> on Twitter.`;

        let lastEle = bottom.lastElementChild;
        lastEle.appendChild(footer);
    }
}

function cleanHeading1(text) {
    // remove any double quotation marks from the text - sometimes ChatGPT be adding "" quote marks
    return text.replace(/"/g, "");
}
// end