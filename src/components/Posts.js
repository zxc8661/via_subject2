import React, { useState, useEffect } from 'react'
import PostDetail from './PostDetail'
import PostList from './PostList'
import PostWrite from './PostWrite'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'

const Posts = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<PostList />} />
                    <Route path="/PostDetail/:id" element={<PostDetail />} />
                    <Route path="/PostWrite/:id" element={<PostWrite />} />
                    <Route path="/PostWrite/" element={<PostWrite />} />
                </Routes>
            </Router>
        </>
    )
}

export default Posts
