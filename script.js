// capturing the nextjs block
const rootEle = document.querySelector('div[id="__next"]');


// functions
function handleClick() {
    
}

function updateInterface() {}


// onLoad
window.onload = () => {

    updateInterface()
    
    new MutationObserver(() => {
        try {
            updateInterface()
        } catch (err) {
            console.info("GPTExpo err found: Could not update the UI\n", err.stack)
        }
    }).observe(rootEle, {childList: true})
}