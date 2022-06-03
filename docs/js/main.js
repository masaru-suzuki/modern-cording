import 'picturefill'
import 'scroll-behavior-polyfill'
import Common from '/src/scripts/modules/common'
import Home from '/src/scripts/modules/home'
import stickyScroll from '/src/scripts/modules/stick-scroll'

//closest polyfill
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var el = this

    do {
      if (Element.prototype.matches.call(el, s)) return el
      el = el.parentElement || el.parentNode
    } while (el !== null && el.nodeType === 1)
    return null
  }
}

Common.initGlobalVariables()
Common.setObjectFitImagesPolyfill()

const docReady = () => {
  Common.setSmoothScroll()
  Common.setCurrentWidth()
  Common.globalNavDropdown()
  Common.toggleGlobalNav()
  Common.accordion()
  Common.tabPanel()
  Home.mainSlider()
  Home.copyDescription()
  stickyScroll.stopStickyBottom()
}

const onLoad = () => {}

const onResize = () => {
  if (window.GLOBAL_VARIABLES.currentWidth === window.innerWidth) {
    return
  }

  Common.setCurrentWidth()
}

const onScroll = () => {
  Common.backTopButton()
}

const init = () => {
  'use strict'
  if (document.readyState !== 'loading') {
    docReady()
  } else {
    document.addEventListener('DOMContentLoaded', docReady, false)
  }
  window.addEventListener('load', onLoad, false)
  window.addEventListener('resize', onResize, false)
  window.addEventListener('scroll', onScroll, false)
}
init()
