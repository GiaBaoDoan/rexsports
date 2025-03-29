"use client";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Import `react-quill` mà không có SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface EditorProps {
  value: string;
  onChange: (content: string) => void;
}

const Editor = ({ value, onChange }: EditorProps) => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ header: [1, 2, 3, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["image", "link"],
    ],
  };

  return <ReactQuill value={value} onChange={onChange} modules={modules} />;
};

export default Editor;
