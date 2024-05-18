let body = document.querySelector('body');
let invoicebtn = document.createElement('button');
invoicebtn.setAttribute('id','invoicebtn');
// invoicebtn.classList.add('animate');

function toggleAnimation() {
    invoicebtn.classList.toggle('animate');
}


invoicebtn.onClick = toggleAnimation();
let assistimg = document.createElement('img');
assistimg.setAttribute('src','https://icons.veryicon.com/png/o/media/photo-audio-video/voice-assistant.png')
let assistimgdiv = document.createElement('div');
assistimgdiv.appendChild(assistimg)
invoicebtn.appendChild(assistimgdiv);
// invoicebtn.addEventListener('click',speechrecognition);
body.appendChild(invoicebtn);



let ulheader = document.querySelector('ul.global-nav__primary-items');
let liviewPosts  = document.createElement('li');
liviewPosts.classList.add("global-nav__primary-item")

let aviewpost = document.createElement("a");
aviewpost.setAttribute("target","_self");
aviewpost.setAttribute("href","https://www.linkedin.com/my-items/saved-posts/");
aviewpost.classList.add('app-aware-link','global-nav__primary-link');
let outerdiv = document.createElement('div');
let innerdiv = document.createElement('div');
outerdiv.classList.add("ivm-image-view-model","global-nav__icon-ivm")
innerdiv.classList.add("ivm-view-attr__img-wrapper","display-flex")

let savedicon = document.createElement('img');
savedicon.setAttribute('src',chrome.runtime.getURL("images/savedicon.png"));
savedicon.classList.add('savedimgicon');

innerdiv.appendChild(savedicon);
outerdiv.appendChild(innerdiv);
aviewpost.appendChild(outerdiv);

let spanElement = document.createElement('span');
spanElement.classList.add("t-12", "break-words","block", "t-black--light" ,"t-normalglobal-nav__primary-link-text")
spanElement.innerHTML = "Saved";

aviewpost.appendChild(spanElement);
liviewPosts.appendChild(aviewpost);
ulheader.appendChild(liviewPosts);

// document.addEventListener('keypress',handlekbd)
// function handlekbd(event){
//     if(event.shiftKey && event.altKey && event.code=='KeyO'){
//         aviewpost.click();
//     }
// }


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "openSavedPosts") {
        // Handle the action to open saved posts
        handleOpenSavedPosts();
    }
});

// Function to handle opening saved posts
function handleOpenSavedPosts() {
    aviewpost.click();
}
function searchfunction(speechtotext) {
    let searchInput = document.querySelector('[aria-label="Search"]');

    window.onload =()=>{
        var regex = /\bsearch\s+(.*)/i;
        var match = speechtotext.match(regex);
        var searchString=""
        if (match && match.length > 1) {
            searchString = match[1];
            searchString = searchString.trim();
        }
        console.log(searchString);
        if (searchInput) {
            searchInput.value = `${searchString}`;
            searchInput.dispatchEvent(enterevent);
            const filters = document.querySelectorAll('.search-reusables__primary-filter')
            if (filters.length > 0) {
                filters[0].click();
            }
        }
    }
        
}

var enterevent = new KeyboardEvent('keydown', {
    key: 'Enter',
    keyCode: 13,
    which: 13,
    bubbles: true
});
// speechrecognition api use
let speechRecognition = new webkitSpeechRecognition();
invoicebtn.onclick = (()=> {
    speechRecognition.continuous = true;
    speechRecognition.lang = "en-in";
    speechRecognition.start();
})


const allLinks = document.querySelectorAll('a.global-nav__primary-link');

speechRecognition.onresult = (event) => {
    let transcript = event.results[event.resultIndex][0].transcript;
    const trim = transcript.trim().toLowerCase();
    console.log(trim)
    //console.log(event);
    if (trim.includes("open post")) {
        aviewpost.click();
    }
    else if(trim.includes("home")){
        window.location.href = "https://linkedin.com";
    }
    else if(trim.includes("refresh feeds") || trim.includes("refresh post")  ){
        //console.log(transcript.trim().toLowerCase());
        let elements = document.querySelectorAll('.app-aware-link');
        let firstElement = elements[0];
        firstElement.click();
    }
    else if(trim.includes("change theme")){
        changetheme();
    }
    // else if(trim.includes("messages in side") || trim.includes("messages in small")||trim.includes('hide')){
    //     let sidemsgbtns = document.querySelector('.msg-overlay-bubble-header__control msg-overlay-bubble-header__control--new-convo-btn.artdeco-button.artdeco-button--circle.artdeco-button--muted.artdeco-button--1.artdeco-button--tertiary.ember-view');
    //     let sidemsgbtn = sidemsgbtns[sidemsgbtns]
    //     sidemsgbtn.click();
    // } not done
    else if(trim.includes("messages")){
        allLinks.forEach(function(link) {
            var messagingSpan = link.querySelector('span[title="Messaging"]');
            if (messagingSpan !== null){
                // If found, log the <a> element to the console
                // console.log('Found <a> element with title "messaging":', link);
                link.click();
            }
        });
    }
    else if(trim.includes("search")){
        let searchInput = document.querySelector('[aria-label="Search"]');

    // window.onload =()=>{
        var regex = /\bsearch\s+(.*)/i;
        var match = trim.match(regex);
        var searchString=""
        if (match && match.length > 1) {
            searchString = match[1];
            searchString = searchString.trim();
        }
        console.log(searchString);
        if (searchInput) {
            searchInput.value = `${searchString}`;
            searchInput.dispatchEvent(enterevent);
            const filters = document.querySelectorAll('.search-reusables__primary-filter')
            if (filters.length > 0) {
                filters[0].click();
            }
        }
    // }
    }
    else if(trim.includes("copy")){
            navigator.clipboard.writeText("https://www.linkedin.com/in/sk0331jain/")
          
          // Example usage:
    }
};



