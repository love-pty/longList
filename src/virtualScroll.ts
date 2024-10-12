import { IData } from "../fetch"
import { scroll } from "./utils/scroll"
export default (element:HTMLElement,data:IData[]) => {

    const boundary = [0, 0]
    enum Mode { append, before }
    let startIndex = 0
    let endIndex = 0
    const step = 10
    const threshold = 200

    const init = () => {
        element.style.position = 'relative'
        drop()
        initScroll(element)
    }

    const drop = () => {
        const frag = document.createDocumentFragment()
        const length = endIndex + step
        for(endIndex; endIndex < length; endIndex++) {
            const item = data[endIndex]
            if(!item) {
                break
            }
            const div = createElement(item, Mode.append)
            frag.appendChild(div)
        }
        element.appendChild(frag)
    }

    const rise = () => {
        const frag = document.createDocumentFragment()
        const length = startIndex - step
        for(let i = startIndex - 1; i > length; i--) {
            const item = data[i]
            if(!item) {
                break
            }
            startIndex--
            const div = createElement(item, Mode.before)
            if(frag.childElementCount) {
                frag.insertBefore(div,frag.firstChild)
            }else {
                frag.appendChild(div)
            }
        }
        element.childElementCount && element.insertBefore(frag,element.firstChild)
    }

    const createElement = (item:IData, mode:Mode) => {
        const div = document.createElement('div')
        div.setAttribute('class','item')
        div.style.backgroundColor = item.color
        div.innerText = item.string
        if(mode === Mode.append) {
            div.style.transform = `translateY(${boundary[1]}px)`
            boundary[1] += 100
        } else if(mode === Mode.before) {
            boundary[0] -= 100
            div.style.transform = `translateY(${boundary[0]}px)`
        }
        return div
    }

    const initScroll = (element:HTMLElement) => {
        element.addEventListener('scroll',scroll(element, (e) => {
            if(e.scrollBottom < threshold && e.mode === Mode.append) {
                drop()
                while(element.children.length) {
                    const childTrans = getComputedStyle(element.firstChild as Element).getPropertyValue('transform').replace(/[^0-9\-,]/g, '').split(',').map(item => Number(item))[5]
                    if(e.scrollTop - threshold > childTrans) {
                        element.removeChild(element.firstChild as Element)
                        startIndex++
                        boundary[0] += 100
                    }else {
                        break
                    }
                }
            }else if(e.mode === Mode.before && e.scrollTop - threshold < boundary[0]) {
                rise()
            }
        }))
    }

    init()

}