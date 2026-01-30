// src/pages/SearchNewAddCategoryPage.tsx
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchNewAddLayout from "../../components/search/new/SearchNewAddLayout";
import SearchNewAddCategoryForm from "../../components/search/new/SearchNewAddCategoryForm";

export default function SearchNewAddCategoryPage() {
  const navigate = useNavigate();
  const [sp] = useSearchParams();

  const title = useMemo(() => sp.get("title") ?? "", [sp]);
  const author = useMemo(() => sp.get("author") ?? "", [sp]);

  const [categories, setCategories] = useState<string[]>([]);

  const isNextActive = categories.length > 0;

  const handleClose = () => navigate(-1);

  const handleNext = () => {
    if (!isNextActive) return;

    navigate(
      `/search/new/more?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}`,
      {
        state: {
          categories,
        },
      }
    );
  };


  return (
    <SearchNewAddLayout
      title="도서 분야를 선택해주세요."
      subtitle="최대 2개 선택 가능합니다."
      isNextActive={isNextActive}
      onClose={handleClose}
      onNext={handleNext}
      leftIconType="back"
      step={2}

    >
      <SearchNewAddCategoryForm value={categories} onChange={setCategories} max={2} />
    </SearchNewAddLayout>
  );
}
