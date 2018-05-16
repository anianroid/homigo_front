import React, {Component} from 'react';

class LoveItLiveIt extends React.Component {

    render() {
        return (
            <div>
                <div className="clearfix">
                  <div className="container-fluid section">
                    <div className="col-md-12 text-center space-top">
                      <h1 className="footer-home-text" style={{fontWeight: '200', paddingBottom: '1em', letterSpacing: '0.2em'}}>LOVE IT? <span style={{fontSize: 'inherit', fontWeight: '800'}}>LIVE IT.</span></h1>
                      <a className="btn btn-primary" href="/houses">Explore homes</a>
                    </div>
                  </div>
                </div>
            </div>
        )
    }


}
    
export default LoveItLiveIt;