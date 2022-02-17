const img = document.querySelectorAll('img')
const prev_btn = document.querySelector('.prev-btn')
const next_btn = document.querySelector('.next-btn')
let linenav = document.querySelector('.linenav')
let line = document.getElementsByTagName('li')

// ***重要的當前位置***
let currentIndex = 0

// 每5秒跑一次 設參數儲存也能自動跑
let time = setInterval(autoplay, 5000)

// 刷新自動播放 先清除掉 再重跑 
function refreshLineAnimate() {
  clearInterval(time)
  // 前面要有當初設的參數
  time = setInterval(autoplay, 5000)
}

// 自動撥放函式
function autoplay() {
  // 讓當前的位置每次加1 
  currentIndex++

  // 如果加到超過圖片數量的長度 則位置變為0
  if(currentIndex > img.length - 1) {
    currentIndex = 0
  }

  // 把當前位置丟進起始函式去跑
  setInitial()
}

// 對應圖片有幾個 就產出幾個點號
for(let i = 0; i < img.length; i++) {
  // 有幾個圖片就產生幾個元素<li>
  let line_li = document.createElement('li')
    
  // 給予元素<li> 加上 class = "dot"
  line_li.classList = 'line'
  // 給對應id
  line_li.setAttribute('id', parseInt(i))
  // 給予onclick事件 函式裡是偵測當前點擊的id
  line_li.setAttribute('onclick', 'lineClick(this.id)')
  // 把每一次跑完的<li class = "dot"></li> 加到 <ul class = "dotnav">裡
  linenav.appendChild(line_li) 
}

// 設置起始函數
function setInitial() {
  // 顯示圖片的函式
  function displayImg() {
    for(let i = 0; i < img.length; i++) {
      // 跑有幾個圖片 為每一個圖片設定透明度為0
      img[i].style.opacity = 0
    }
    // 當前位置的圖片才把透明度變為1
    img[currentIndex].style.opacity = 1
  }
    
  // 顯示點號的函式
  function displayLine() {
    for (let i = 0; i < line.length; i++) {
      // 跑有幾個點號 每一個點號原本都是只有 class = "dot"
      line[i].classList = 'line'
    }
    // 當前位置的點號才加上active class = "dot active"
    line[currentIndex].classList.add('active')
  }

  // 最後執行這兩個函式
  displayImg()
  displayLine()
}

// 上一個按鈕點擊事件
prev_btn.addEventListener('click', () => {
  // 如果當前位置是0 
  if(currentIndex == 0) {
    // 則回到圖片最後一個(圖片數量長度減1)
    currentIndex = img.length - 1
    // 否則每次遞減一個    
  }else {
    currentIndex--
  }

  refreshLineAnimate()
  setInitial()
})

// 下一個按鈕點擊事件
next_btn.addEventListener('click', () => {
  // 如果當前位置是最後一個圖片
  if(currentIndex == img.length - 1) {
    // 則回到0
    currentIndex = 0
    // 否則每次增加一個
  }else {
    currentIndex++
  }

  refreshLineAnimate()
  setInitial()
})

// 點號點擊 抓取元素上的 onclick事件 對應的id值
function lineClick(e) {
  // 對應的id 存進當前位置
  currentIndex = e

  refreshLineAnimate()
  setInitial()
}

// 一開始的起始設置秀出
setInitial()