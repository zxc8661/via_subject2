import React, { useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

type Props = {
  editorRef: React.RefObject<Editor>;
  content?: string;
  setBody: (body: string) => void;
};

const toolbar = [['heading', 'bold', 'italic', 'strike'], ['hr', 'quote', 'ul', 'ol'], ['image']];

const TuiEditor: React.FC<Props> = ({ content, editorRef, setBody }) => {
  useEffect(() => {
    if (content && editorRef.current) {
      editorRef.current.getInstance().setHTML(content);
    }
  }, [content, editorRef]);

  const onChangeGetHTML = () => {
    if (editorRef.current) {
      const data = editorRef.current.getInstance().getHTML();
      setBody(data); 
    }
  };

  return (
    <Editor
      initialValue={content ?? ' '}
    initialEditType='wysiwyg'
        // 변경: previewStyle을 vertical로 설정
      autofocus={false}
      ref={editorRef}
      toolbarItems={toolbar}
      hideModeSwitch={true}
      height='500px'
      usageStatistics={false}  // 변경: usageStatistics를 false로 설정
     onChange={onChangeGetHTML}
    />
  );
};

export default TuiEditor;