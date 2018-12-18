import React from 'react'
import NavBar from '../components/NavBar';


const withNav = (WrappedComponent, type) => {
  class HOC extends React.Component {
    render() {
      return (
        <React.Fragment>
          <NavBar />
          { type === 'fullPage' ? <WrappedComponent {...this.props} /> : (
            <div className="container" style={{ marginTop: '30px' }}>
              <WrappedComponent {...this.props} />
            </div>
          )}
        </React.Fragment>
      )
    }
  }

  return HOC
}

export default withNav;