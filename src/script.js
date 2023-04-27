// start
const rootEle = document.querySelector('div[id="__next"]');
    
let expoButton = document.createElement('button');

expoButton.setAttribute('class', 'gpt2markdown-export whitespace-nowrap font-medium flex items-center justify-center gap-2 text-sm rounded-md py-2 px-3 btn-primary');

expoButton.innerHTML = `
    <span><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-export" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
    <path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3"></path>
    </svg></span>
    <span>GPT 2 Markdown</span>
    `;
let inputActionNode = document.querySelector("div[class*='relative flex h-full flex-1 items-stretch md:flex-col']");
inputActionNode.classList.add('gap-2')
inputActionNode.appendChild(expoButton)
expoButton.addEventListener('click', handleClick);
expoButton.addEventListener('load', () => console.log(document.querySelector(".pr-14.bg-gray-800")?.innerText))

new MutationObserver(() => {
    handleStore();
}).observe(rootEle, {
    childList: true,
    subtree: true
})

function handleClick() {
    if (document.querySelector(".pr-14.bg-gray-800")?.innerText === undefined) return
    
    const e = document.querySelectorAll(".text-base");
    let t = "";
    for (const s of e) {
        if (s.querySelector('.whitespace-pre-wrap')) {

            let innerHtml = s.querySelector(".whitespace-pre-wrap").innerHTML;
            t += `${htmlToMarkdown(s.querySelectorAll('img').length > 1 ? `<b>You:</b>` : `<b>ChatGPT:</b>`)}\n${htmlToMarkdown(innerHtml)}\n\n --------\n`
        }
    }
    const o = document.createElement("a");
    let d = new Date()
    let date = d.toISOString()
    o.download = (`${date} • ${document.querySelector(".pr-14.bg-gray-800")?.innerText}` || "Conversation with ChatGPT") + ".md", o.href = URL.createObjectURL(new Blob([t])), o.style.display = "none", document.body.appendChild(o), o.click()
}

function handleStore() {
    let textarea = document.querySelector('textarea')
    if (!textarea) return

    let existingButton = document.querySelector('.gpt2markdown-export')
    let existingFooter = document.querySelector("div[class*='absolute bottom-0']");
    if (!existingButton || !existingFooter) {
        expoButton.setAttribute('class', 'gpt2markdown-export whitespace-nowrap font-medium flex items-center justify-center gap-2 text-sm rounded-md py-2 px-3 btn-primary');
        expoButton.innerHTML = `
            <span><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-export" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
            <path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3"></path>
            </svg></span>
            <span>GPT 2 Markdown</span>
    `;
        inputActionNode = document.querySelector("div[class*='relative flex h-full flex-1 items-stretch md:flex-col']");
        inputActionNode.classList.add('gap-2')
        inputActionNode.appendChild(expoButton)
        expoButton.addEventListener('click', handleClick);
    }
}

function htmlToMarkdown(html) {
    let markdown = html;
    markdown = markdown.replace(/<\/?div[^>]*>/g, '');
    markdown = markdown.replace(/<br[^>]*>/g, '\n');

    markdown = markdown.replace(/<strong>(.*?)<\/strong>/g, '**$1**');
    markdown = markdown.replace(/<em>(.*?)<\/em>/g, '*$1*');
    markdown = markdown.replace(/<u>(.*?)<\/u>/g, '__$1__');
    markdown = markdown.replace(/<code>(.*?)<\/code>/g, '`$1`');
    markdown = markdown.replace(/<a href="(.*?)">(.*?)<\/a>/g, '[$2]($1)');
    markdown = markdown.replace(/<h1>(.*?)<\/h1>/g, '# $1\n');
    markdown = markdown.replace(/<h2>(.*?)<\/h2>/g, '## $1\n');
    markdown = markdown.replace(/<h3>(.*?)<\/h3>/g, '### $1\n');
    markdown = markdown.replace(/<h4>(.*?)<\/h4>/g, '#### $1\n');
    markdown = markdown.replace(/<h5>(.*?)<\/h5>/g, '##### $1\n');
    markdown = markdown.replace(/<h6>(.*?)<\/h6>/g, '###### $1\n');
    markdown = markdown.replace(/<code class="[^"]*">/g, '\n'); // remove code tags
    markdown = markdown.replace(/<\/code>/g, ''); // remove pre tags
    markdown = markdown.replace(/<pre><span class="">(.*?)<\/span>/g, '<pre>$1\n'); // remove language tag portion
    markdown = markdown.replace(/<pre>/g, '```'); // replace pre tags with code blocks
    markdown = markdown.replace(/<\/pre>/g, '\n```\n'); // replace pre tags with code blocks
    markdown = markdown.replace(/<button class="flex ml-auto gap-2">(.*?)<\/button>/g, ''); // Remove copy button SVG
    markdown = markdown.replace(/<span(?: class="[^"]*")?>|<\/span>/g, ''); // Remove span tags with or without a class
    markdown = markdown.replace(/<p>(.*?)<\/p>/g, '$1\n');

    // Add these lines to convert &lt; and &gt; to < and >, respectively
    markdown = markdown.replace(/&lt;/g, '<');
    markdown = markdown.replace(/&gt;/g, '>');

    const unorderedRegex = /<ul>(.*?)<\/ul>/gs;
    let match;
    let indent = 0;
    while ((match = unorderedRegex.exec(markdown))) {
        const list = match[1];
        const items = list.split('<li>');
        let itemStr = '';
        items.forEach((item, i) => {
            if (i === 0) return;
            item = item.replace('</li>', '');
            if (item.indexOf('<ul>') !== -1) {
                indent++;
            }
            itemStr += `${'  '.repeat(indent)}\n* ${item}`;
            if (item.indexOf('</ul>') !== -1) {
                indent--;
            }
        });
        markdown = markdown.replace(match[0], `${itemStr}`);
    }

    const orderedRegex = /<ol.*?>(.*?)<\/ol>/gs;
    const orderedLists = markdown.match(orderedRegex);
    if (orderedLists) {
        orderedLists.forEach((orderedList) => {
            let mdOrderedList = '';
            const listItems = orderedList.match(/<li.*?>(.*?)<\/li>/g);
            if (listItems) {
                listItems.forEach((listItem, index) => {
                    if (listItem.indexOf('<ul>') !== -1) {
                        indent++;
                    }
                    mdOrderedList += `${'  '.repeat(indent)}${index + 1
                        }. ${listItem.replace(/<li.*?>(.*?)<\/li>/g, '$1\n')}`;
                    if (listItem.indexOf('</ul>') !== -1) {
                        indent--;
                    }
                });
            }
            markdown = markdown.replace(orderedList, mdOrderedList);
        });
    }

    markdown = markdown.replace(/<ul>(.*?)<\/ul>/gs, function (match, p1) {
        return (
            '\n' +
            p1.replace(/<li>(.*?)<\/li>/g, function (match, p2) {
                return '\n* ' + p2;
            })
        );
    });
    const tableRegex = /<table>.*?<\/table>/g;
    const tableRowRegex = /<tr>.*?<\/tr>/g;
    const tableHeaderRegex = /<th.*?>(.*?)<\/th>/g;
    const tableDataRegex = /<td.*?>(.*?)<\/td>/g;

    const tables = html.match(tableRegex);
    if (tables) {
        tables.forEach((table) => {
            let markdownTable = '\n';
            const rows = table.match(tableRowRegex);
            if (rows) {
                rows.forEach((row) => {
                    let markdownRow = '\n';
                    const headers = row.match(tableHeaderRegex);
                    if (headers) {
                        headers.forEach((header) => {
                            markdownRow += `| ${header.replace(tableHeaderRegex, '$1')} `;
                        });
                        markdownRow += '|\n';
                        markdownRow += '| --- '.repeat(headers.length) + '|';
                    }
                    const data = row.match(tableDataRegex);
                    if (data) {
                        data.forEach((d) => {
                            markdownRow += `| ${d.replace(tableDataRegex, '$1')} `;
                        });
                        markdownRow += '|';
                    }
                    markdownTable += markdownRow;
                });
            }
            markdown = markdown.replace(table, markdownTable);
        });
    }

    return markdown;
}
// end