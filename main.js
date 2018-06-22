var keys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 'd', 's', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'c', 'x', 'v', 'b', 'n', 'm']
]
// 初始化网站hash
var hash = {
  'q': 'quora.com',
  'w': 'info.cern.ch/hypertext/WWW/TheProject.html',
  'e': 'ele.me',
  'r': 'ruby-china.com',
  't': 'taobao.com',
  'y': 'youtube.com',
  'u': 'youku.com',
  'i': 'iqiyi.com',
  'a': 'acfun.cn',
  'f': 'ruanyifeng.com/blog',
  'g': 'github.com',
  'j': 'javascript.ruanyifeng.com',
  'z': 'zhihu.com',
  'b': 'bilibili.com'
}

function getLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name) || '{}')
}

websites = getLocalStorage('customWebsites')
hash = Object.assign({}, hash, websites)
index = 0
while(index < keys.length){
  rowDiv = document.createElement('div')
  rowDiv.className += 'row'
  wrapper.appendChild(rowDiv)
  row = keys[index]
  column = 0
  while(column < keys[index].length){
    kbd = document.createElement('kbd')
    kbd.className += 'kbd'
    span = document.createElement('span')
    span.className += 'text'
    span.textContent = row[column] 
    kbd.appendChild(span)
    img = document.createElement('img')
    img.onerror = function(event) {
      event.target.src = 'images/dot.png'
    }
    img.src = `http://${hash[row[column]]}/favicon.ico`
    kbd.appendChild(img)
    button = document.createElement('button')
    button.textContent = '编辑'
    button.id = row[column]
    button.onclick = function(event){
      button = event.target
      key = button.id
      address = prompt('绑定一个网址')
      hash[key] = address
      localStorage.setItem('customWebsites', JSON.stringify(hash))
      img = button.previousSibling
      img.src = `http://${address}/favicon.ico`
    }
    kbd.appendChild(button)
    rowDiv.appendChild(kbd)
    column += 1
  }
  index += 1
}
document.onkeypress = function(kbdEvent){
  website = hash[kbdEvent['key']]
  window.open(`http://${website}`, '_blank')
}