import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { LuPencilLine } from 'react-icons/lu'
import { usePostState, useDispatch } from './Provider'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
    align-items: center;

    width: 100%;

    text-align: center;
`

const H2 = styled.h2`
    font-weight: 900;
`

const Button = styled.button`
    cursor: pointer;
    height: 4.5vh;
    background: #ffffff;
    border: 1px solid #dcdcdc;
    border-width:px
    display: flex;
    align-items: center;
    padding: 0 15px;
    font-weight: 900;
    
`
const Title_Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 5vh;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
`
const Table = styled.table`
    width: 100%;
    border-top: 1px solid #000;
`

const Thead = styled.thead`
    border-right: 1px solid #ddd;
    font-weight: 600;
    font-size: 13px;
`

const Th = styled.th`
    padding: 10px;
    border-bottom: 1px solid #ddd;
`
const Th1 = styled.th`
    padding: 10px;
    border-bottom: 1px solid #ddd;
    width: 8%;
`
const Th2 = styled.th`
    padding: 10px;
    border-bottom: 1px solid #ddd;
    width: 50%;
`
const Td = styled.td`
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: center;
`
const TitleTd = styled.td`
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: center;
    cursor: pointer;
`

const Tbody = styled.tbody`
    font-size: 13px;
    font-weghit: 500;
`

const GoDetail = (id, navigator) => {
    navigator('/PostDetail/' + id)
}

const GoWrite = (navigatior) => {
    navigatior('/PostWrite')
}

function Bar({ props = [], navigatior }) {
    return (
        <>
            <Table>
                <Thead>
                    <tr>
                        <Th1>번호</Th1>
                        <Th2>제목</Th2>
                        <Th>작성자</Th>
                        <Th>작성일</Th>
                        <Th>조회</Th>
                        <Th>좋아요</Th>
                    </tr>
                </Thead>
                <Tbody>
                    {[...props].reverse().map((post) => {
                        console.log(post.date)
                        console.log('AA')
                        const date = post.date.split(', ')[1].substring(0, 5)

                        return (
                            <tr>
                                <Td>{post.id}</Td>
                                <TitleTd
                                    onClick={() =>
                                        GoDetail(post.id, navigatior)
                                    }
                                >
                                    {post.title}
                                </TitleTd>
                                <Td>{post.author}</Td>
                                <Td>{date}</Td>
                                <Td>{post.views}</Td>
                                <Td>{post.likes}</Td>
                            </tr>
                        )
                    })}
                </Tbody>
            </Table>
        </>
    )
}

function PostList() {
    const posts = usePostState()
    const navigator = useNavigate()

    return (
        <>
            <Container>
                <Title_Button>
                    <H2>게시물 리스트</H2>
                    <Button onClick={() => GoWrite(navigator)}>
                        <LuPencilLine />
                        글쓰기
                    </Button>
                </Title_Button>
            </Container>
            <Bar props={posts} navigatior={navigator} />
        </>
    )
}

export default PostList
