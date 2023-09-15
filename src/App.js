import {Component} from 'react'

import {v4} from 'uuid'

import './App.css'

const colorsList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordsList: [],
    isShow: false,
    isTrue: false,
  }

  getPasswordList = event => {
    event.preventDefault()
    const {website, username, password} = this.state

    const initial = website[0].toUpperCase()
    const classAdd = colorsList[Math.floor(Math.random() * 5)]
    console.log(classAdd)

    const newPasswordsList = {
      id: v4(),
      websiteName: website,
      userName: username,
      passwordName: password,
      initialName: initial,
      addClass: classAdd,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPasswordsList],
      website: '',
      username: '',
      password: '',
      searchInput: '',
    }))
  }

  deleteItem = id => {
    const {passwordsList} = this.state

    const newList = passwordsList.filter(eachList => eachList.id !== id)
    const caseOf = newList.length !== 0
    this.setState({passwordsList: newList, isTrue: caseOf})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  render() {
    const {
      isShow,
      website,
      username,
      password,
      searchInput,
      passwordsList,
    } = this.state
    const newList = passwordsList.filter(eachList =>
      eachList.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    let {isTrue} = this.state
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="sub-div1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="sub-div1-image2"
          />
          <form className="add-details" onSubmit={this.getPasswordList}>
            <h1 className="details-heading">Add New Password</h1>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-image"
              />
              <input
                type="text"
                className="input-element"
                placeholder="Enter Website"
                value={website}
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-image"
              />
              <input
                type="text"
                className="input-element"
                placeholder="Enter Username"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>

            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-image"
              />
              <input
                type="password"
                className="input-element"
                placeholder="Enter Password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="sub-div1-image1"
            alt="password manager"
          />
        </div>
        <div className="sub-div2">
          <div className="first-div">
            <div className="your-password">
              <h1 className="heading-name">Your Password</h1>
              <p className="colored-text">0</p>
            </div>
            <div className="search-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="input-image"
              />
              <input
                type="text"
                className="input-element"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr className="hr" />
          <div className="show-passwords">
            <input
              type="checkbox"
              className="check-box"
              id="input"
              onChange={this.showPassword}
            />
            <label htmlFor="input" className="label-password">
              ShowPassword
            </label>
          </div>
          {!isTrue && (
            <div className="empty-state">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no-passwords"
                className="empty-image"
              />
              <p className="no-passwords">No Passwords</p>
            </div>
          )}

          {isTrue && (
            <ul className="result-container">
              {newList.map(eachList => (
                <li className="item-list" id={eachList.id} key={eachList.id}>
                  <p className={`initial ${eachList.addClass}`}>
                    {eachList.initialName}
                  </p>
                  <div className="list-content">
                    <p className="website">{eachList.websiteName}</p>
                    <p className="website">{eachList.userName}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="starts"
                        className="stars-image"
                      />
                    )}
                    {isShow && (
                      <p className="website">{eachList.passwordName}</p>
                    )}
                    <button
                      type="button"
                      className="del-btn"
                      onClick={() => this.deleteItem(eachList.id)}
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                        alt="delete"
                        className="del-image"
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
export default App
