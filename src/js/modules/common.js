import SmoothScroll from 'smooth-scroll'
import objectFitImages from 'object-fit-images'

const initGlobalVariables = () => {
  const header = document.getElementsByTagName('header')

  window.GLOBAL_VARIABLES = window.GLOBAL_VARIABLES || {
    currentWidth: 0,
    lastPos: 0,
    headerHeight: header[0].clientHeight,
  }
}

const setCurrentWidth = () => {
  window.GLOBAL_VARIABLES.currentWidth = window.innerWidth
}

const setSmoothScroll = () => {
  const isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style

  if (!isSmoothScrollSupported) {
    const scroll = new SmoothScroll('a[href*="#"]', {
      speed: 500,
      durationMax: 1000,
      offset: 100,
      easing: 'easeInOutQuad',
      header: '.header',
    })

    const hasId = location.href.indexOf('#')

    if (hasId !== -1) {
      const locationId = location.href.slice(hasId)
      document.querySelector(`a[href="${locationId}"]`).click()
    }
  }
}

const setObjectFitImagesPolyfill = () => {
  objectFitImages()
}

const controlAccordionPanel = (trigger) => {
  const panel = trigger.nextElementSibling
  if (trigger.dataset.bodyHidden === 'true') {
    trigger.setAttribute('data-body-hidden', false)
    panel.setAttribute('aria-hidden', false)
  } else {
    trigger.setAttribute('data-body-hidden', true)
    panel.setAttribute('aria-hidden', true)
  }

  if (panel.style.maxHeight) {
    panel.style.maxHeight = null
  } else {
    panel.style.maxHeight = panel.scrollHeight + 'px'
  }
}

const accordion = () => {
  if (document.querySelector('.accordion') === null) {
    return null
  }

  const accoList = document.querySelectorAll('.accordion')

  Array.from(accoList).forEach((acco) => {
    const trigger = acco.querySelector('.accordion_trigger > button')
    trigger.addEventListener('click', (e) => {
      controlAccordionPanel(e.currentTarget.parentNode)
    })
  })
}

const globalNavDropdown = () => {
  if (document.querySelector('.globalNav_childrenWrap') === null) {
    return null
  }

  const dropdownList = document.querySelectorAll('.globalNav_childrenWrap')

  Array.from(dropdownList).forEach((dropdown) => {
    const trigger = dropdown.previousElementSibling

    dropdown.addEventListener('click', (e) => {
      if (e.target.classList.contains('globalNav_childrenWrap')) {
        dropdown.setAttribute('aria-hidden', true)
      }
    })

    trigger.addEventListener('click', (e) => {
      controlAccordionPanel(e.currentTarget)
    })
  })
}

const toggleGlobalNav = () => {
  const triggers = document.querySelectorAll('.globalNavOpen')
  const navPanel = document.querySelector('.globalNavWrap')
  const contents = document.querySelector('.contents')

  triggers[1].addEventListener('click', () => {
    if (triggers[1].dataset.bodyHidden === 'true') {
      const pos = window.pageYOffset
      triggers[1].setAttribute('data-body-hidden', false)
      navPanel.setAttribute('aria-hidden', false)
      contents.style.position = 'fixed'
      contents.style.top = -1 * pos + 60 + 'px'
      contents.style.width = '100%'
      window.GLOBAL_VARIABLES.lastPos = pos
    } else {
      triggers[1].setAttribute('data-body-hidden', true)
      navPanel.setAttribute('aria-hidden', true)
      contents.removeAttribute('style')
      window.scrollTo({
        top: window.GLOBAL_VARIABLES.lastPos,
        left: 0,
        behavior: 'instant',
      })
    }
  })

  navPanel.addEventListener('click', (e) => {
    if (e.target.closest('.globalNav') === null) {
      triggers[1].click()
    }
  })
}

const tabPanel = () => {
  if (document.querySelector('.tab') === null) {
    return null
  }

  const tabs = document.querySelectorAll('[role="tablist"]')
  const contents = document.querySelectorAll('[role="tabpanel"]')

  const changePanel = (e) => {
    const selectedButton = e.currentTarget
    const selectedPanelId = selectedButton.getAttribute('aria-controls')
    const tabGroup = selectedButton.closest('[role="tablist"]').dataset.tabGroup
    let tabs = document.querySelectorAll('[role="tablist"]')
    tabs = Array.from(tabs).filter((tab) => tab.dataset.tabGroup === tabGroup)

    tabs.forEach((tab) => {
      const buttons = tab.querySelectorAll('[role="tab"]')
      Array.from(buttons).forEach((button) => {
        if (button.getAttribute('aria-controls') === selectedPanelId) {
          button.setAttribute('aria-selected', 'true')
        } else {
          button.setAttribute('aria-selected', 'false')
        }
      })
    })

    Array.from(contents).forEach((panel) => {
      if (panel.id === selectedPanelId) {
        panel.setAttribute('aria-hidden', 'false')
      } else {
        panel.setAttribute('aria-hidden', 'true')
      }
    })

    const firstTabPos = tabs[0].getBoundingClientRect()
    const thisScrollBehavior = !('scrollBehavior' in document.documentElement.style) ? 'instant' : 'smooth'

    window.scrollTo({
      top: firstTabPos.top + window.pageYOffset - window.GLOBAL_VARIABLES.headerHeight,
      left: 0,
      behavior: thisScrollBehavior,
    })
  }

  Array.from(tabs).forEach((tab) => {
    const buttons = tab.querySelectorAll('[role="tab"]')
    Array.from(buttons).forEach((button) => {
      button.addEventListener('click', changePanel)
    })
  })
}

const backTopButton = () => {
  const button = document.querySelector('.pageTop')

  if (window.pageYOffset > 100) {
    if (button.getAttribute('aria-hidden') === 'false') {
      return false
    }

    button.setAttribute('aria-hidden', false)
  } else {
    if (button.getAttribute('aria-hidden') === 'true') {
      return false
    }

    button.setAttribute('aria-hidden', true)
  }
}

export default {
  initGlobalVariables,
  setCurrentWidth,
  setSmoothScroll,
  setObjectFitImagesPolyfill,
  accordion,
  globalNavDropdown,
  toggleGlobalNav,
  tabPanel,
  backTopButton,
}
