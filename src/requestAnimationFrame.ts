import { IData } from "../fetch"
export default (element:HTMLElement,data: IData[]) => {
    requestAnimationFrame(() => step(element,data))
}
const step = (element:HTMLElement,data: any) => {
    const fragment = document.createDocumentFragment()
    for( let i = 0; i < 20; i++ ) {
        const item = data.shift()
        if(!item ) {
            break
        }
        const div = document.createElement('div')
        div.innerText = item.string
        div.setAttribute('class','item')
        div.style.backgroundColor = item.color
        fragment.appendChild(div)
    }
    element.appendChild(fragment)
    data.length && requestAnimationFrame(() => step(element,data))
}