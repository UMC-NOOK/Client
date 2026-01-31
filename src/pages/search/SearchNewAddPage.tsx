import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchNewAddLayout from "../../components/search/new/SearchNewAddLayout";
import SearchNewAddInfoForm from "../../components/search/new/SearchNewAddInfoForm";
import { useShell } from "../../app/AppShell";

export default function SearchNewAddCategoryPage() {
  const { setHideFooter } = useShell();

  useEffect(() => {
    setHideFooter(true);
    return () => setHideFooter(false);
  }, [setHideFooter]);

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const isNextActive = !!title.trim() && !!author.trim();

  const handleClose = () => navigate(-1);

  const handleNext = () => {
    if (!isNextActive) return;

    const params = new URLSearchParams({
      title: title.trim(),
      author: author.trim(),
    });
    navigate(`/search/new/category?${params.toString()}`);
  };

  return (
    <SearchNewAddLayout
      title="필수 도서 정보를 입력해주세요."
      isNextActive={isNextActive}
      onClose={handleClose}
      onNext={handleNext}
      step={1}
    >
      <SearchNewAddInfoForm
        title={title}
        author={author}
        onChangeTitle={setTitle}
        onChangeAuthor={setAuthor}
      />
    </SearchNewAddLayout>
  );
}
