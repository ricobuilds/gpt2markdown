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
expoButton.innerHTML = 'GPTExpo';
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