'use strict'

// クエリを定義
const mediaQuery = window.matchMedia('(min-width: 768px)')

const stopStickyBottom = () => {
  // PC以上で以下を実行
  if (!mediaQuery.matches) return

  const sideNav = document.querySelector('.sideNav')

  // sideNavがある時は以下を実行
  if (sideNav === null) return

  // sideNavの高さを出力
  const sideNavHeight = sideNav.clientHeight
  // 画面幅を出力
  const windowHeight = document.documentElement.clientHeight
  // headerの高さを出力
  const headerHeight = document.querySelector('.header').clientHeight
  // 見えている範囲を出力
  const visibleAria = windowHeight - headerHeight

  // sideNavが画面幅（見えている範囲）よりも大きい場合は以下を実行
  if (sideNavHeight < visibleAria) return
  // sideNavの一番下が、画面の下に合うようにposition:sticky;のtopを計算
  const transformTopPx = windowHeight - sideNavHeight
  // topをコントロール
  sideNav.style.top = `${transformTopPx}px`
}

export default { stopStickyBottom }
