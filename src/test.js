console.log("This is from test JS")
document.body.style.background = 'orange'

// The JS responds immediately when I save, whereas the main.js doesn't, need to address this. 
const countBtn = document.querySelector('#countBtn');


countBtn.addEventListener('click', () => {
    countBtn.dataset.count++
    countBtn.innerText = countBtn.dataset.count
})

console.log(countBtn.dataset.count);
// document.querySelector('#countBtn').dataset.count = 'boooooo king'
