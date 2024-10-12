import _ from 'lodash'
interface scrollEvent {
    mode: Mode
    scrollTop: number
    scrollBottom: number
}
enum Mode { 
    append,
    before
}
export const scroll = (element:HTMLElement, func:(e:scrollEvent) => void) => {
    let top = 0
    return _.throttle(() => {
        const { scrollTop, scrollHeight } = element
        if(scrollTop > top) {
            top = scrollTop
            func({ mode: Mode.append,scrollTop,scrollBottom: scrollHeight - scrollTop - element.clientHeight })
        }else if(scrollTop < top) {
            top = scrollTop
            func({ mode: Mode.before, scrollTop, scrollBottom: scrollHeight - scrollTop - element.clientHeight })
        }
    },100)
}