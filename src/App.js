import './App.css'
import React from 'react'
import { GlobalStyle, Head } from './components/PostHead'
import Posts from './components/Posts'
import { Provider } from './components/Provider'
import User from './components/Foot'

function App() {
    return (
        <>
            <Provider>
                <GlobalStyle />
                <Head />
                <Posts />
                <User />
            </Provider>
        </>
    )
}

export default App
