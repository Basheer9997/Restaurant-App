import {useState} from 'react'
import {Redirect, useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const history = useHistory()

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  const onSubmitFailure = msg => {
    setShowErrorMsg(true)
    setErrorMsg(msg)
    setUsername('')
    setPassword('')
  }

  const submitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const token = Cookies.get('jwt_token')
  if (token !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-container">
      <div className="login-form-container">
        <form className="form-container" onSubmit={submitForm}>
          <div className="input-container">
            <label className="input-label" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="username-input-field"
              value={username}
              onChange={onChangeUsername}
              placeholder="Username"
            />
          </div>

          <div className="input-container">
            <label className="input-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="username-input-field"
              value={password}
              onChange={onChangePassword}
              placeholder="Password"
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>

          {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    </div>
  )
}

export default LoginForm
