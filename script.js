const form = document.getElementById('form')
const color = document.getElementById('color')
const mode = document.getElementById('mode')
const scheme = document.querySelector('.scheme')
const colors = document.querySelectorAll('.color-display')
const hexCopied = document.querySelector('.hex-copied')

form.addEventListener('submit', e => {
    e.preventDefault()
    sendRequest(color.value.slice(1), mode.value)
})


const sendRequest = function(color, mode){
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}&count=5`)
        .then(res => res.json())
        .then(data => renderColors(data.colors))
}


const renderColors = function(colors){
    let newHtml = ''
    colors.forEach(newColor => {
        newHtml+= `
        <div class="colors"'>
            <div id='${newColor.hex.value}' class="color-display" style="background-color: ${newColor.hex.value};">
            </div>
            <div id='${newColor.hex.value}' class="color-hex">${newColor.hex.value}</div>
        </div>`
    });
    scheme.innerHTML = newHtml
}


sendRequest('75d54F', 'monochrome')

document.addEventListener('click', e => {
    if (e.target.classList[0] === 'color-display' | e.target.classList[0] === 'color-hex') {
        navigator.clipboard.writeText(e.target.id)
        hexCopied.classList.remove('hidden')
        setTimeout(() => {
            hexCopied.classList.add('hidden')
        }, 1500)
    }
})