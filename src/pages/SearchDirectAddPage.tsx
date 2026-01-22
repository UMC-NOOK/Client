// src/pages/SearchDirectAddPage.tsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchDirectAddForm from "../components/search/SearchDirectAddForm";

export default function SearchDirectAddPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleClose = () => navigate(-1);

  const handleNext = () => {
    if (!title.trim() || !author.trim()) return;
    // 다음 단계 이동
  };

  return (
    <SearchDirectAddForm
      title={title}
      author={author}
      onChangeTitle={setTitle}
      onChangeAuthor={setAuthor}
      onClose={handleClose}
      onNext={handleNext}
    />
  );
}
