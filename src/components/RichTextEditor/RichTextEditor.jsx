import { Editor } from '@tinymce/tinymce-react';
import { useRef, useImperativeHandle, forwardRef } from 'react';

const RichTextEditor = forwardRef((props, ref) => {
  const editorRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getContent: () => editorRef.current?.getContent(),
    setContent: (value) => editorRef.current?.setContent(value || ''),
  }));

  const handleEditorChangeInternal = (event, editor) => {
    const content = editor.getContent();

    if (props.onEditorChange) {
      props.onEditorChange(content);
    }
  };

  return (
    <Editor
      apiKey="3h72qsw2wzfx3cvfgz2fezrk9yfr5jg7ut77r5l37ko093th"
      onInit={(_, editor) => (editorRef.current = editor)}
      onChange={handleEditorChangeInternal}
      value={props.value}
      init={{
        selector: '#your-textarea-id',
        plugins: 'link lists',
        toolbar: 'undo redo | bold italic underline | bullist numlist | link',
        menubar: false,
        branding: false,
        height: 370,
        statusbar: false,
      }}
    />
  );
});

export default RichTextEditor;
