import { h } from './core'
import { Component } from './component'
import { Fragment } from './fragment'
import { Helmet } from './components/helmet'

export const withStyles: any = (styles: any) => (WrappedComponent: any) => {
  return class extends Component {
    render() {
      const { children, ...rest } = this.props

      const helmet = h(Helmet, null, h('style', null, styles.toString()))

      const component =
        children && children.length > 0
          ? h(WrappedComponent, { ...rest }, children)
          : h(WrappedComponent, { ...this.props })

      return h(Fragment, null, helmet, component)

      // same in JSX
      // return (
      //   <Fragment>
      //     <Helmet>
      //       <style>{styles.toString()}</style>
      //     </Helmet>

      //     {children && children.length > 0 ? (
      //       <WrappedComponent {...rest}>{children}</WrappedComponent>
      //     ) : (
      //       <WrappedComponent {...this.props} />
      //     )}
      //   </Fragment>
      // )
    }
  }
}
