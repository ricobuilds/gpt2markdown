// capturing the nextjs block
const rootEle = document.querySelector('div[id="__next"]');
const contEle = document.querySelector('.chatgptcont')


// functions
function handleClick() {
    console.log('you pressed me!')
}

let expoButton = document.createElement('button');
expoButton.classList.add('font-medium', 'flex', 'items-center', 'gap-2', 'text-sm', 'rounded-md', 'py-2', 'px-3', 'btn-primary')
contEle.append(expoButton)
expoButton.innerHTML = `
<span><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-export" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
<path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
<path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3"></path>
</svg></span>
<span>GTPExpo</span>
`;
expoButton.addEventListener('click', handleClick);


function updateInterface() {
    // is the button there?
    if (document.querySelector(".web-gptexpo-button")) return

    // is the textarea there?
    textarea = document.querySelector('textarea')
    if (!textarea) return

    let txtAreaWrapper = textarea.parentNode


}


// onLoad
// window.onload = () => {

//     updateInterface()

//     new MutationObserver(() => {
//         try {
//             updateInterface()
//         } catch (err) {
//             console.info("GPTExpo err found: Could not update the UI\n", err.stack)
//         }
//     }).observe(rootEle, {childList: true})
// }