import { IData } from "../fetch"
export default (element:HTMLElement,data: IData[]) => {
    const fragment = document.createDocumentFragment()
    let timer = setInterval(() => {
        for( let i = 0; i < 20; i++ ) {
            const item = data.shift()
            if( !item ) {
                clearInterval(timer)
                break
            }
            const div = document.createElement('div')
            div.innerText = item.string
            div.setAttribute('class','item')
            div.style.backgroundColor = item.color
            fragment.appendChild(div)
        }
        element.appendChild(fragment)
    },100)
}