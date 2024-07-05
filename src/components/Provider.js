import React, { useReducer, createContext, useRef, useContext } from 'react'

const posts = []

const comments = []

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

const PostStateContext = createContext()
const PostDispatchContext = createContext()
const CommentStateContext = createContext()
const CommentDispatchContext = createContext()
const NextIdContext = createContext()
const UserContext = createContext()

export function Provider({ children }) {
    const [postsstate, Postdispatch] = useReducer(Reducer, posts)
    const [commentstate, Commentdispatch] = useReducer(Reducer, comments)
    const nextId = useRef(1)
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
