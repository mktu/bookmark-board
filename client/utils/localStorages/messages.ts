type MessageKey = 'line-integration' | 'line-add-friend'

export const isMessageHidden = (key:MessageKey)=>{
    return localStorage.getItem(key) === 'hide'
}

export const setMessageVisibility = (key:MessageKey, show:boolean)=>{
    localStorage.setItem(key, show ? 'hide' : 'show')
}