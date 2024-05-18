//  <button id="linkedinBtn">LinkedIn</button>

//     <!-- Output Window -->
//     <div id="outputWindow" class="hidden">
//         <!-- Output content goes here -->
//     </div> 

let gptbtn = document.createElement('div');
gptbtn.setAttribute('id','gptbtn');
gptbtn.innerHTML = 'InAI'

let outputWindow = document.createElement('div');
outputWindow.setAttribute('id','outputWindow');
outputWindow.classList.add('hidden');

body.appendChild(gptbtn)
body.appendChild(outputWindow)

document.addEventListener('DOMContentLoaded', function () {
    const gptbtn = document.getElementById('gptbtn');
    const outputWindow = document.getElementById('outputWindow');

    // Toggle output window display when LinkedIn button is clicked
    gptbtn.addEventListener('click', function () {
        outputWindow.classList.toggle('hidden');
    });
});


