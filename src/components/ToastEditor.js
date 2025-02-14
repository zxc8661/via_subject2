import React, { useEffect } from 'react'
import { Editor } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor.css'

const toolbar = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote', 'ul', 'ol'],
    ['image'],
]

const TuiEditor = ({ content, editorRef, setBody }) => {
    useEffect(() => {
        if (content && editorRef.current) {
            editorRef.current.getInstance().setHTML(content)
        }
    }, [content, editorRef])

    const onChangeGetHTML = () => {
        if (editorRef.current) {
            const data = editorRef.current.getInstance().getHTML()
            setBody(data)
        }
    }

    return (
        <Editor
            initialValue={content ?? ' '}
            initialEditType="wysiwyg"
            autofocus={false}
            ref={editorRef}
            toolbarItems={toolbar}
            hideModeSwitch={true}
            height="500px"
            usageStatistics={false}
            onChange={onChangeGetHTML}
        />
    )
}

<<<<<<< HEAD
  return (
    <Editor
      initialValue={content ?? ' '}
    initialEditType='wysiwyg'
      autofocus={false}
      ref={editorRef}
      toolbarItems={toolbar}
      hideModeSwitch={true}
      height='500px'
      usageStatistics={false} 
     onChange={onChangeGetHTML}
    />
  );
};

export default TuiEditor;
=======
export default TuiEditor
//브랜치 연습중
>>>>>>> test1
