import React from 'react'
import logo from './naver_logo.jpg'
import { createGlobalStyle, styled } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    display: flex;
    justify-content: center;
    // align-items: center;
    height: 100vh;
    margin: 0;
  }
`

const Container = styled.div`
    display: flex;
    align-items: center;
    border: 2px solid black;
    padding: 10px;
    width: 900px;
    position: relative;
    margin-top: 10px;
    position: relative;
`

const Img = styled.img`
    width: 150px; /* "width"의 오타 수정 */
    height: 50px;
`

const H1 = styled.h1`
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    font-weight: 900;
`

function Head() {
    return (
        <Container>
            <Img src={logo} alt="no" />
            <H1>네이버 카페 클론</H1>
        </Container>
    )
}

export { GlobalStyle, Head }
