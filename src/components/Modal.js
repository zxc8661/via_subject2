import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'

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

function CustomModal({ type, state }) {
    const [modalIsOpen, setModalIsOpen] = useState(state)

    useEffect(() => {
        setModalIsOpen(state)
    }, [state])

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={customStyles}
            >
                <ModalContent>
                    <ModalTitle>경고</ModalTitle>
                    <span>{type}을 입력해 주세요!</span>
                    <ModalButton onClick={() => setModalIsOpen(false)}>
                        닫기
                    </ModalButton>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CustomModal
