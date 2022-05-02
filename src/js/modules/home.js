import Glide from '@glidejs/glide'

const mainSlider = () => {
  if (document.querySelector('.homeMainSlider') === null || document.querySelector('[data-glide-el]') === null) {
    return null
  }

  const opt = {
    type: 'carousel',
    startAt: 0,
    autoplay: 4000,
    gap: 0,
  }

  const homeMainSlider = new Glide('.homeMainSlider', opt)
  homeMainSlider.mount()
}

const copyDescription = () => {
  const copyBtn = document.getElementById('js_copyBtn')
  if (!copyBtn) return

  copyBtn.addEventListener('click', () => {
    const url = location.href
    const title = document.querySelector('.p-articleHeader_heading').innerText

    navigator.clipboard.writeText(title + '\n' + url)
  })
}

export default { mainSlider, copyDescription }
