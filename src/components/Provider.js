import React, { useReducer, createContext, useRef, useContext } from 'react'

const now = new Date()
const formattedDate = now.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
})

const posts = [
    {
        id: 1,
        title: 'a',
        author: 'b',
        date: formattedDate,
        text: '2024.06.28. 15:41',
        views: 0,
        likes: 0,
    },
    {
        id: 2,
        title: 'e',
        author: 'f',
        date: formattedDate,
        text: '2024.06.28. 15:41',
        views: 0,
        likes: 0,
    },
]

const comments = [
    {
        id: 1,
        postId: 1,
        author: '베이비부엉이',
        text: '올까요!',
        date: '2024.06.28. 15:41',
        likes: 0,
    },
    {
        id: 2,
        postId: 2,
        author: '상땃쥐',
        text: '온대여',
        date: '2024.06.28. 15:41',
        likes: 0,
    },
]

function Reducer(state, action) {
    switch (action.type) {
        case 'WRITE':
            return state.concat(action.data)
        case 'CORRECT':
            return state.map((post) =>
                post.id === action.data.id ? action.data : post,
            )
        case 'DELETE':
            return state.filter((data) => data.id !== action.id)
        default:
            return state
    }
}

function commentReducer(state, action) {
    switch (action.type) {
        case 'WRITE':
            return [...state, action.data]
        case 'CORRECT':
            return state.map((comment) =>
                comment.id === action.data.id ? action.data : comment,
            )
        case 'DELETE':
            return state.filter((data) => data.id !== action.id)
        default:
            return state
    }
}

const PostStateContext = createContext()
const PostDispatchContext = createContext()
const CommentStateContext = createContext()
const CommentDispatchContext = createContext()
const NextIdContext = createContext()
const UserContext = createContext()

export function Provider({ children }) {
    const [postsstate, Postdispatch] = useReducer(Reducer, posts)
    const [commentstate, Commentdispatch] = useReducer(Reducer, comments)
    const nextId = useRef(3)
    const user = useRef('username')

    return (
        <PostStateContext.Provider value={postsstate}>
            <PostDispatchContext.Provider value={Postdispatch}>
                <NextIdContext.Provider value={nextId}>
                    <UserContext.Provider value={user}>
                        <CommentStateContext.Provider value={commentstate}>
                            <CommentDispatchContext.Provider
                                value={Commentdispatch}
                            >
                                {children}
                            </CommentDispatchContext.Provider>
                        </CommentStateContext.Provider>
                    </UserContext.Provider>
                </NextIdContext.Provider>
            </PostDispatchContext.Provider>
        </PostStateContext.Provider>
    )
}

export function usePostState() {
    return useContext(PostStateContext)
}

export function usePostDispatch() {
    return useContext(PostDispatchContext)
}

export function useCommentState() {
    return useContext(CommentStateContext)
}

export function useCommentDispatch() {
    return useContext(CommentDispatchContext)
}

export function useNextId() {
    return useContext(NextIdContext)
}

export function useUser() {
    return useContext(UserContext)
}
