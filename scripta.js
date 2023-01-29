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
    hr: () => `---\n`,
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
    let t = markdownFormatter.heading1(cleanHeading1(document.querySelector(".pr-14.bg-gray-800")?.innerText));
    for (const s of e) {
        if (s.querySelector(".whitespace-pre-wrap")) {
            if (s.querySelector('code')) {
                let _code = s.querySelector('code').innerText
                t += markdownFormatter.codeBlock(_code)
            }
            else if (s.querySelector('a')) {
                let linkText = s.querySelector('a').innerText
                let linkUrl = s.querySelector('a').href
                t += markdownFormatter.link(linkText, linkUrl)
            }
            else if (s.querySelector('strong')) {
                let boldText = s.querySelector('strong').innerText
                t += markdownFormatter.bold(boldText)
            }
            else if (s.querySelector('em') || s.querySelector('i')) {
                let italicText = s.querySelector('em').innerText ?? s.querySelector('i').innerText
                t += markdownFormatter.italic(italicText)
            }
            else if (s.querySelector('hr')) {
                t += markdownFormatter.hr()
            }
            else if (s.querySelector('del')) {
                let delText = s.querySelector('del').innerText
                t = markdownFormatter.strikethrough(delText)
            }
            else if (s.querySelector('h2')) {
                let _heading2 = s.querySelector('h2').innerText
                t = markdownFormatter.heading2(_heading2)
            }
            else if (s.querySelector('h3')) {
                let _heading3 = s.querySelector('h3').innerText
                t = markdownFormatter.heading3(_heading3)
            }
            else if (s.querySelectorAll('ul > li').length > 0) {
                let bulletPoints = s.querySelectorAll('ul > li').forEach(point => {
                    t += markdownFormatter.bulletList(point?.innerText)
                })
            }
            else {
                t += `${markdownFormatter.bold(s.querySelectorAll('img').length > 1 ? 'You' : 'ChatGPT')}: ${(s.querySelector(".whitespace-pre-wrap").innerHTML)}\n\n`
                }
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
        expoButton.innerHTML = `<span> <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-export" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                        <path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3"></path>
                    </svg></>
                        <span>GPT 2 Markdown</span>
                `;
        inputActionNode = document.querySelector("div[class*='relative flex h-full flex-1 md:flex-col']");
        inputActionNode.appendChild(expoButton)
        expoButton.addEventListener('click', handleClick);

        var bottom = document.querySelector("div[class*='absolute bottom-0']");
        let footer = document.createElement('div')

        let extension_version = chrome.runtime.getManifest().version;
        footer.innerHTML = `<a href='https://github.com/0xreeko/gpt2markdown' target='_blank' class='underline text-white'> GPT2Markdown extension v.${ extension_version }</>.If you like the extension, please consider following me <a href='https://twitter.com/intent/follow?screen_name=emergingtechguy' target='_blank' class='underline text-white'>@EmergingTechGuy</a> on Twitter.`;

        let lastEle = bottom.lastElementChild;
        lastEle.appendChild(footer);
    }
}

function cleanHeading1(text) {
    // remove any double quotation marks from the text - sometimes ChatGPT be adding "" quote marks
    return text.replace(/"/g, "");
}
// end