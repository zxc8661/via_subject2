import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { CiHeart } from 'react-icons/ci'
import { useParams } from 'react-router-dom'
import {
    usePostState,
    useUser,
    useCommentDispatch,
    useCommentState,
    usePostDispatch,
    useNextId,
} from './Provider'
import { useNavigate } from 'react-router-dom'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import { Viewer } from '@toast-ui/react-editor'

const Container = styled.div`
    width: 100%;
    margin: 0px;
    margin-top: 15px;
`
const Title_Action = styled.div`
    display: flex;
    justify-content: space-between;
`

const Title = styled.h1`
    font-size: 24px;
    padding: 0px;
    font-weight: bold;
`

const SubInfo = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`

const Avatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ddd;
    margin-right: 10px;
    color: #888;
`

const Author_Date_Views = styled.span`
    display: flex;
    flex-direction: column;
`

const Author = styled.span`
    font-weight: bold;
    margin-right: 10px;
`

const Date_Views = styled.div`
    display: flex;
    gap: 10px;
`
const Date = styled.span`
    margin-right: 10px;
    color: #888;
`

const Views = styled.span`
    color: #888;
`

const Content = styled.div`
    margin-bottom: 30px;
    line-height: 1.6;
    white-space: pre-wrap;
    border-top: 1px solid #ddd;
    padding-top: 20px;
`

const Actions = styled.div`
    display: flex;
    justify-content: flex-end;

    position: relative;
    top: 20px;
`

const Button = styled.button`
    padding: 10px 20px;
    margin-left: 10px;
    border: none;
    border-radius: 5px;
    background-color: #f0f0f0;
    cursor: pointer;
`

const Comments = styled.div`
    margin-top: 20px;
`

const CommentCount = styled.h3`
    font-weight: bold;
    margin-bottom: 10px;
`

const CommentList = styled.div`
    font-size: 13px;
`

const Comment = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding-bottom: 5px;
    ${(props) =>
        !props.stat &&
        css`
            border-bottom: 1px solid #ddd;
        `}
`

const CommentAvatar = styled(Avatar)`
    width: 30px;
    height: 30px;
`

const CommentContent = styled.div`
    margin-left: 10px;
    flex-grow: 1;
`

const CommentAuthor = styled.span`
    font-weight: bold;
    font-size:;
`

const CommentText = styled.div`
    margin-bottom: 5px;
    margin-top: 5px;
`

const CommentSubInfo = styled.div`
    display: flex;
    color: #888;
    font-size: 12px;
`

const CommentDate = styled.span`
    margin-right: 10px;
`

const CommentReply = styled.span`
    cursor: pointer;
    margin-right: 10px;
`

const CommentLikes = styled.span``

const NewComment = styled.div`
    display: flex;
    margin-top: 20px;
    border: 2px solid #ddd;
    border-radius: 1px;
    text-aline;
    
`

const NewCommentInput = styled.input`
    flex-grow: 1;
    padding: 10px;
    margin-right: 10px;
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;

    border: none;
`

const NewCommentButton = styled.button`
    background-color: #d2ffd2;
    font-weight: bold;
    color: green;
    width: 5%;
    height: 4vh;
    font-size: 10px;
    padding: 0;
    border: none;
    margin: auto;
    margin-right: 10px;
    border-radius: 5px;
    cursor: pointer;
`

function PostView({ content }) {
    return <Viewer initialValue={content} />
}

const GoWrite = (id, navigatior) => {
    navigatior('/PostWrite/' + id)
}
const GoList = (navigatior) => {
    navigatior('/')
}
function PostDetail() {
    const { id } = useParams()
    const navigator = useNavigate()
    const user = useUser()

    const posts = usePostState()
    const postsdispatch = usePostDispatch()
    const post = posts.find((p) => p.id === Number(id))

    const comments = useCommentState()
    const commentsdispatch = useCommentDispatch()
    const [newcomment, SetNewComment] = useState('')

    const WriteComment = () => {
        const newcommentdata = {
            id: comments.length + 1,
            postId: Number(id),
            author: user.current,
            text: newcomment,
            date: '2024.06.28. 15:41',
            likes: 0,
        }

        commentsdispatch({ type: 'WRITE', data: newcommentdata })
        SetNewComment('')
    }

    const PostDelet = () => {
        postsdispatch({ type: 'DELETE', id: post.id })
        GoList(navigator)
    }
    const showcomments = comments.filter(
        (comment) => comment.postId === Number(id),
    )

    return (
        <Container>
            <Title_Action>
                <Title>{post.title}</Title>
                <Actions>
                    <Button onClick={() => GoWrite(post.id, navigator)}>
                        수정
                    </Button>
                    <Button onClick={PostDelet}>삭제</Button>
                </Actions>
            </Title_Action>
            <SubInfo>
                <Avatar />
                <Author_Date_Views>
                    <Author>{post.author}</Author>
                    <Date_Views>
                        <Date>{post.date}</Date>
                        <Views>{post.Views}</Views>
                    </Date_Views>
                </Author_Date_Views>
            </SubInfo>
            <Content>
                <PostView content={post.text} />
            </Content>

            <Comments>
                <CommentCount>댓글 {showcomments.length}</CommentCount>
                <CommentList>
                    {showcomments.map((comment, current) => {
                        let last =
                            current === showcomments.length - 1 ? true : false

                        return (
                            <Comment stat={last}>
                                <CommentAvatar />
                                <CommentContent>
                                    <CommentAuthor>
                                        {comment.author}
                                    </CommentAuthor>
                                    <CommentText>{comment.text}</CommentText>
                                    <CommentSubInfo>
                                        <CommentDate>
                                            {comment.date}
                                        </CommentDate>
                                        <CommentReply></CommentReply>
                                        <CommentLikes>
                                            {comment.likes}
                                            <CiHeart />
                                        </CommentLikes>
                                    </CommentSubInfo>
                                </CommentContent>
                            </Comment>
                        )
                    })}
                </CommentList>

                <NewComment>
                    <NewCommentInput
                        placeholder="댓글 입력"
                        onChange={(e) => SetNewComment(e.target.value)}
                        value={newcomment}
                    />
                    <NewCommentButton onClick={WriteComment}>
                        등록
                    </NewCommentButton>
                </NewComment>
            </Comments>
        </Container>
    )
}

export default PostDetail
