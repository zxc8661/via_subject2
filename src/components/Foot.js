import React from 'react'
import styled from 'styled-components'
import { useUser } from './Provider'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
    margin-top: 50px;
    margin-bottom: 50px;
`

const Input = styled.input``

function User() {
    const user = useUser()

    const Change = (e) => {
        user.current = e.target.value
    }

    return (
        <Container>
            <Input onChange={Change} placeholder="닉네임을 입력해 주세요" />
        </Container>
    )
}

export default User
