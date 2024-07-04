import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import TuiEditor from './ToastEditor'
import { useNavigate, useParams } from 'react-router-dom'
import { usePostState, usePostDispatch, useUser, useNextId } from './Provider'
import Modal from 'react-modal'
import CustomModal from './Modal'

const Container = styled.div`
    width: 100%;
`

const Title_button = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 17px;
    margin-bottom: 17px;
    align-items: center;
    font-weight: 900;
`

const Title = styled.h1``

const InputButton = styled.button`
    font-weight: 900;
    width: 6%;
    height: 5vh;
    border-radius: 7px;
    border-width: 0px;
    background: #d2ffd2;
    color: green;
    cursor: pointer;
`

const InputPostTitle = styled.input`
    width: 98.2%;
    height: 5vh;
    border-radius: 10px;
    border-width: 0px;
    background: #dcdcdc;
    font-size: 15px;
    font-weight: 800;
    padding-left: 15px;
    margin-bottom: 25px;
`

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`

const ModalTitle = styled.h2`
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
`

const ModalButton = styled.button`
    background-color: #d2ffd2;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
`

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        borderRadius: '10px',
        border: '1px solid #ccc',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    },
}

const goList = (navigator) => {
    navigator('/')
}

function PostWrite() {
    const { id } = useParams()
    const [body, setBody] = useState('')
    const posts = usePostState()
    const [post, Setpost] = useState('')
    const [titlestate, setTitleState] = useState('')
    const postsdispatch = usePostDispatch()
    const user = useUser()
    const nextId = useNextId()
    const editorRef = useRef(null)

    const navigate = useNavigate()

    const [modalIsOpen, setModalIsOpen] = useState(false)

    useEffect(() => {
        if (id !== null) {
            const temppost = posts.find((p) => p.id === Number(id))
            Setpost(temppost)
            if (temppost) {
                setTitleState(temppost.title)
                setBody(temppost.text)
            } else {
                console.warn(`Post with id ${id} not found`)
            }
        } else {
            setTitleState('')
            setBody('')
        }
    }, [id, posts])

    const titleChange = (e) => {
        setTitleState(e.target.value)
    }
    const now = new Date()
    const formattedDate = now.toLocaleString('en-Kr', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',

        hour12: false,
    })

    const writePost = () => {
        if (titlestate === '') {
            setModalIsOpen(true)
        } else {
            setModalIsOpen(false)
            const postdata = {
                id: id ? Number(id) : nextId.current,
                title: titlestate,
                author: id ? post.author : user.current,
                date: formattedDate,
                text: body,
                views: 0,
                likes: 0,
            }
            nextId.current += 1
            postsdispatch({ type: id ? 'CORRECT' : 'WRITE', data: postdata })
            goList(navigate)
        }
    }

    return (
        <Container>
            <Title_button>
                <Title>카페 글쓰기</Title>
                <InputButton onClick={writePost}>등록</InputButton>
                <CustomModal type="제목" state={modalIsOpen}></CustomModal>
            </Title_button>
            <InputPostTitle
                placeholder="제목을 입력해 주세요"
                onChange={titleChange}
                value={titlestate}
            />
            <TuiEditor content={body} editorRef={editorRef} setBody={setBody} />
        </Container>
    )
}

export default PostWrite
