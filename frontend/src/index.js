import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ConfirmProvider } from 'material-ui-confirm'
import store from './store'
import App from './App'
import './index.css'
const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ConfirmProvider>
          <App />
        </ConfirmProvider>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  )
}

renderApp()
store.subscribe(() => {
  renderApp()
})
