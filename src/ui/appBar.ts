import { Component } from '../component'
import { h, render } from '../core'
import { boxShadow, zIndex } from './_config'

const classes = {
  container: 'appBar_container',
  scrollingDown: 'appBar_scrolling_down',
  bar: 'toolbar',
  left: 'toolbar_left',
  right: 'toolbar_right',
  icon: 'toolbar_icon',
}

interface AppBarProps {
  maxWidth?: number
}

interface ToolbarProps {
  menu?: boolean
  title?: string
  icons?: any
}

export class Toolbar extends Component<ToolbarProps> {
  render() {
    const styles = `
      .toolbar {
        padding: 16px;
      }

      .toolbar i.toolbar_icon {
        width: 22px;
        height: 22px;
        display: inline-block;
        content: '';

        /*-webkit-mask: url(YOUR_SVG_URL) no-repeat 50% 50%;
        mask: url(YOUR_SVG_URL) no-repeat 50% 50%;*/

        -webkit-mask-size: cover;
        mask-size: cover; 

        background-color: white;
      }

      .toolbar_navigation_box {
        padding: 4px;
        width: 20px;
        height: 16px;
        margin-right: 32px;
        cursor: pointer;
      }

      .toolbar_hamburger_button,
      .toolbar_hamburger_button_hamburger_button::before,
      .toolbar_hamburger_button_hamburger_button::after {
        position: absolute;
        width: 20px;
        height: 2px;
        border-radius: 2px;
        background: white;
        content: '';
      }
      .toolbar_hamburger_button::before {
        top: 6px;
      }
      .toolbar_hamburger_button::after {
        top: 12px;
      }

      .toolbar_back_button,
      .toolbar_back_button::before,
      .toolbar_back_button::after {
        position: relative;
        top: 7px;
        width: 20px;
        height: 2px;
        border-radius: 2px;
        background: white;
        content: '';
      }

      .toolbar_back_button::before {
        position: absolute;
        top: -5px;
        transform: translate3d(-4px,0,0) rotate(-45deg) scaleX(.7);
      }

      .toolbar_back_button::after {
        position: absolute;
        top: 5px;
        transform: translate3d(-4px,0,0) rotate(45deg) scaleX(.7);
      }
    `

    const styleElement = h('style', {}, styles)
    document.head.appendChild(styleElement)

    // const hamburger = h('div', { class: 'bar_hamburger_button' })
    const back = h('div', { class: 'toolbar_back_button' })

    const navigation = this.props.menu ? h('div', { class: 'toolbar_navigation_box' }, back) : null

    const title = this.props.title ? h('div', { class: 'toolbar_title' }, this.props.title) : null

    const icons = Object.keys(this.props.icons).map((key) => {
      const icon = this.props.icons[key]
      return render(icon)
    })

    const left = h('div', { class: classes.left }, navigation, title)
    const right = h('div', { class: classes.right }, ...icons)

    const bar = h('div', { class: classes.bar }, left, right)

    return bar
  }
}

export class AppBar extends Component<AppBarProps> {
  curr_scrollY: number = 0
  last_scrollY: number = 0
  curr_scrollingState = 'none'
  last_scrollingState = 'none'
  container: HTMLElement

  scroll() {
    this.curr_scrollY = window.scrollY

    if (this.curr_scrollY > this.last_scrollY) {
      this.curr_scrollingState = 'down'
    } else if (this.curr_scrollY < this.last_scrollY) {
      this.curr_scrollingState = 'up'
    }

    this.last_scrollY = this.curr_scrollY

    if (this.curr_scrollY < 1) {
      this.container.classList.remove('appBar_scrolling_down')
    } else if (this.last_scrollingState !== this.curr_scrollingState) {
      this.last_scrollingState = this.curr_scrollingState

      if (this.curr_scrollingState === 'down') this.container.classList.add('appBar_scrolling_down')
      else this.container.classList.remove('appBar_scrolling_down')
    }
  }

  didMount() {
    this.curr_scrollY = this.last_scrollY = window.scrollY
    window.addEventListener('scroll', () => this.scroll())
  }

  didUnmount() {
    window.removeEventListener('scroll', this.scroll)
  }

  render() {
    const styles = `
    .appBar_container {
      background-color: #6200EE;
      color: white;
      font-weight: 500;

      z-index: ${zIndex.bar}

      position: fixed;
      top: 0;
      left: 0;
      min-height: 24px;
      width: 100vw;


      ${boxShadow}

      transition: top 0.2s;
    }

    .appBar_container.appBar_scrolling_down {
      top: -56px;
    }

    .appBar_container .toolbar {
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
      ${this.props.maxWidth ? `max-width: ${this.props.maxWidth}px;` : ''}
    }

    .appBar_container .toolbar .toolbar_left,
    .appBar_container .toolbar .toolbar_right {
      display: flex;
      align-items: center;      
    }

    .appBar_container .toolbar_title {
      font-size: 20px;
    }
    `

    const styleElement = h('style', {}, styles)
    document.head.appendChild(styleElement)

    // @ts-ignore
    this.container = h('div', { class: classes.container }, this.props.children)

    return this.container
  }
}