// capturing the nextjs block
const rootEle = document.querySelector('div[id="__next"]');
const contEle = document.querySelector('.chatgptcont')
let expoButton = document.createElement('button');
let exportButton = document.createElement('button');
let expoModal = document.createElement("div");

// functions
function handleClick() {
    setTimeout(() => {
        const e = document.querySelectorAll(".text-base");
        let t = "";
        for (const s of e) s.querySelector(".whitespace-pre-wrap") && (t += t == "" ? "" : "--------\n", t += `**${s.querySelectorAll('img').length>1?'You':'ChatGPT'}**: ${h(s.querySelector(".whitespace-pre-wrap").innerHTML)}\n\n`);
        const o = document.createElement("a");
        o.download = (document.querySelector(".pr-14.bg-gray-800")?.innerText || "Conversation with ChatGPT") + ".md", o.href = URL.createObjectURL(new Blob([t])), o.style.display = "none", document.body.appendChild(o), o.click()
    }, 3000);
    
    // function h() {
    //     let gptCanvas = document.querySelector('html').innerHTML
    //     return gptCanvas.replace(/<p>/g, '\n\n').replace(/<\/p>/g, '').replace(/<b>/g, '**').replace(/<\/b>/g, '**').replace(/<i>/g, '_').replace(/<\/i>/g, '_').replace(/<code[^>]*>/g, (match) => {
    //         const lm = match.match(/class="[^"]*language-([^"]*)"/);
    //         return lm ? '\n```' + lm[1] + '\n' : '```';
    //     }).replace(/<\/code[^>]*>/g, '```').replace(/<[^>]*>/g, '').replace(/Copy code/g, '').replace(/This content may violate our content policy. If you believe this to be in error, please submit your feedback — your input will aid our research in this area./g, '').trim();
    // }(() => {
    //     const e = document.querySelectorAll(".text-base");
    //     let t = "";
    //     for (const s of e) s.querySelector(".whitespace-pre-wrap") && (t += `**${s.querySelector('img')?'You':'ChatGPT'}**: ${h(s.querySelector(".whitespace-pre-wrap").innerHTML)}\n\n`);
    //     const o = document.createElement("a");
    //     o.download = o.download = (document.querySelector(".pr-14.bg-gray-800")?.innerText || "Conversation with ChatGPT") + ".md", o.href = URL.createObjectURL(new Blob([t])), o.style.display = "none", document.body.appendChild(o), o.click()
    // })();
}

expoButton.classList.add('font-medium', 'ml-1', 'md:ml-0', 'mt-0', 'md:mt-3', 'flex', 'items-center', 'justify-center', 'gap-2', 'text-sm', 'rounded-md', 'py-2', 'px-3', 'btn-primary')
// contEle.append(expoButton)
expoButton.innerHTML = `
<span><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-export" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
<path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
<path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3"></path>
</svg></span>
<span>GPT 2 Notion</span>
`;
expoButton.addEventListener('click', handleClick);

exportButton.classList.add('font-medium', 'ml-1', 'lg:ml-0', 'mt-3', 'lg:mt-3', 'flex', 'items-center', 'gap-2', 'text-sm', 'rounded-md', 'py-2', 'px-3', 'btn-primary')
exportButton.innerHTML = `
<span>Export to Notion</span>
`;


// modal
// expoModal.classList.add('hidden')
// contEle.append(expoModal);
// expoModal.innerHTML = `
//   <div class="modal-content">
//     <div class="modal-header">
//       <h2>Export conversation</h2>
//       <span class="close-button">&times;</span>
//     </div>
//     <div class="modal-body">
//       <!-- Your modal content goes here --> 
//       <select class="dbSelector">
//         <option>Database1</option>
//         <option>Database2</option>
//         <option>Database3</option>
//         <option>Database4</option>
//         <option>Database5</option>
//         <option>Database6</option>
//       </select>
//       <button class="font-medium ml-1 lg:ml-0 mt-3 lg:mt-0 flex items-center gap-2 text-sm rounded-md py-2 px-3 btn-primary">Export to Notion</button>
//     </div>
//   </div>
// `;


function updateInterface() {
    // is the button there?
    if (document.querySelector(".web-gptexpo-button")) return

    // is the textarea there?
    textarea = document.querySelector('textarea')
    if (!textarea) return

    let txtAreaWrapper = textarea.parentNode

    txtAreaWrapper.parentNode.insertBefore(expoButton, txtAreaWrapper.nextSibling);
}


window.onload = () => {

    updateInterface();

    new MutationObserver(() => {
        try {
            updateInterface();
        } catch (err) {
            console.info("GPTExpo err found: Could not update the UI\n", err.stack)
        }
    }).observe(rootEle, { childList: true })
}

// else

var bottom = document.querySelector("div[class*='absolute bottom-0']");
let footer = document.createElement('div')

let extension_version = chrome.runtime.getManifest().version;
footer.innerHTML = "<a href='https://github.com/0xreeko/gptexpo' target='_blank' class='underline text-white'>GPT2Notion extension v." + extension_version + "</a>. If you like the extension, please consider following me <a href='https://twitter.com/intent/follow?screen_name=emergingtechguy' target='_blank' class='underline text-white'>@EmergingTechGuy</a> on Twitter.";

let lastEle = bottom.lastElementChild;
lastEle.appendChild(footer);