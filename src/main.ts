import _ from 'lodash'
import '../style/index.css'
import { getBaseData } from '../fetch'
import setIntervalRender from './setInterval'
import requestAnimationFrameRender from './requestAnimationFrame'
import virtualScrollRender from './virtualScroll'

const container1 = document.querySelector<HTMLElement>('#container1') || new HTMLElement
const container2 = document.querySelector<HTMLElement>('#container2') || new HTMLElement
const container3 = document.querySelector<HTMLElement>('#container3') || new HTMLElement

const init = async () => {
    const data = await getBaseData('/baseData')
    setIntervalRender(container1,_.cloneDeep(data))
    requestAnimationFrameRender(container2,_.cloneDeep(data))
    virtualScrollRender(container3,_.cloneDeep(data))
}

init()