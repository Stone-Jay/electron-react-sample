import React from 'react'
import ReactDOM from 'react-dom'
import { remote, ipcRenderer } from 'electron'

const app = remote.app
const win = remote.getCurrentWindow()

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      pwd: '',
      canLogin: false
    }
  }
  usernameChange (e) {
    // console.info('name change', e.target)
    this.setState({
      username: e.target.value
    })
  }
  pwdChange (e) {
    // console.info('pwd change', e.target)
    if (e.target.value.length >= 6) {
      this.setState({canLogin: true})
    }else {
      this.setState({canLogin: false})
    }
    this.setState({
      pwd: e.target.value
    })
  }
  login (e) {
    this.setState({canLogin: false})
    var user = {
      userName: this.state.username,
      password: this.state.pwd
    }
    // win.webContents.toggleDevTools()
    ipcRenderer.send('loginCheck', {
      userName: user.userName,
      password: user.password
    })

    ipcRenderer.once('loginCheck-reply', (e, args) => {
      console.log('args: ', args)
      if (!args.result) {
        this.setState({canLogin: true})
      }
    })
  }

  render () {
    return (<div className='panel panel-info'>
              <div className='panel-heading'>
                Login
              </div>
              <div className='panel-body'>
                <form className='form-horizontal'>
                  <div className='form-group'>
                    <div className='col-sm-offset-1 col-sm-10'>
                      <input
                        className='form-control'
                        id='username'
                        onChange={this.usernameChange.bind(this)}
                        placeholder='UserName/Email' />
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='col-sm-offset-1 col-sm-10'>
                      <input
                        type='password'
                        className='form-control'
                        onChange={this.pwdChange.bind(this)}
                        id='password'
                        placeholder='Password' />
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='col-sm-offset-1 col-sm-10'>
                      <input
                        type='button'
                        onClick={this.login.bind(this)}
                        className='btn btn-info'
                        disabled={this.state.canLogin === false}
                        value='Login' />
                    </div>
                  </div>
                </form>
              </div>
            </div>
    )
  }
}
ReactDOM.render(< Login />, document.getElementById('container'))

class LoginNav extends React.Component {
  constructor (props) {
    super(props)
  }

  closeApp () {
    app.quit()
  }
  toggleDevTool () {
    win.webContents.toggleDevTools()
  }

  render () {
    return (<div className='navbar navStyle'>
              <a href='#' onClick={this.closeApp.bind(this)} style={{color: 'white'}}><span className='glyphicon glyphicon-remove' ariaHidden='true'></span></a>
              <a href='#' onClick={this.toggleDevTool.bind(this)} style={{color: 'white', textDecoration: 'none'}}><span className='glyphicon glyphicon-wrench' ariaHidden='true'></span></a>
            </div>
    )
  }
}
ReactDOM.render(< LoginNav />, document.getElementById('loginNav'))
