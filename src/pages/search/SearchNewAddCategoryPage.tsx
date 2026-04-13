import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchNewAddLayout from "../../components/search/new/SearchNewAddLayout";
import SearchNewAddCategoryForm from "../../components/search/new/SearchNewAddCategoryForm";
import { useShell } from "../../app/AppShell";

export default function SearchNewAddCategoryPage() {
  const { setHideFooter } = useShell();

  useEffect(() => {
    setHideFooter(true);
    return () => setHideFooter(false);
  }, [setHideFooter]);

  const navigate = useNavigate();
  const [sp] = useSearchParams();

  const title = useMemo(() => sp.get("title") ?? "", [sp]);
  const author = useMemo(() => sp.get("author") ?? "", [sp]);

  const [category, setCategory] = useState<string | null>(null);
  const isNextActive = !!category;

  const handleClose = () => navigate(-1);

  const handleNext = () => {
    if (!category) return;

    const params = new URLSearchParams({
      title,
      author,
      category,
    });

    navigate(`/search/new/more?${params.toString()}`);
  };

  return (
    <SearchNewAddLayout
      title="도서 분야를 선택해주세요."
      isNextActive={isNextActive}
      onClose={handleClose}
      onNext={handleNext}
      leftIconType="back"
      step={2}
    >
      <SearchNewAddCategoryForm value={category} onChange={setCategory} />
    </SearchNewAddLayout>
  );
}