import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchNewAddLayout from "../../components/search/new/SearchNewAddLayout";
import SearchNewAddMoreForm from "../../components/search/new/SearchNewAddMoreForm";
import { useShell } from "../../app/AppShell";
import { uploadSingleImage } from "../../api/image";
import { createUserBook } from "../../api/book";

type DateParts = {
  yyyy: string;
  mm: string;
  dd: string;
};

export default function SearchNewAddMorePage() {
  const { setHideFooter } = useShell();

  useEffect(() => {
    setHideFooter(true);
    return () => setHideFooter(false);
  }, [setHideFooter]);

  const navigate = useNavigate();
  const [sp] = useSearchParams();

  const title = useMemo(() => sp.get("title") ?? "", [sp]);
  const author = useMemo(() => sp.get("author") ?? "", [sp]);
  const category = useMemo(() => sp.get("category") ?? "", [sp]);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [intro, setIntro] = useState("");
  const [pages, setPages] = useState("");
  const [publisher, setPublisher] = useState("");
  const [isbn, setIsbn] = useState("");
  const [pubDate, setPubDate] = useState<DateParts>({
    yyyy: "",
    mm: "",
    dd: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => navigate("/library");

  const publicationDate = useMemo(() => {
    if (!pubDate.yyyy || !pubDate.mm || !pubDate.dd) return undefined;

    return `${pubDate.yyyy}-${pubDate.mm.padStart(2, "0")}-${pubDate.dd.padStart(2, "0")}`;
  }, [pubDate]);

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("먼저 DEV 로그인 해주세요.");
      return;
    }

    if (!title.trim() || !author.trim() || !category.trim()) {
      alert("필수 정보가 누락되었습니다.");
      return;
    }

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      let coverImageKey: string | undefined;

      if (imageFile) {
        coverImageKey = await uploadSingleImage(imageFile, "book");
      }

      await createUserBook({
        title: title.trim(),
        author: author.trim(),
        categoryName: category.trim(),
        description: intro.trim() || undefined,
        pages: pages.trim() ? Number(pages) : undefined,
        publisher: publisher.trim() || undefined,
        publicationDate,
        isbn13: isbn.trim() || undefined,
        coverImageKey,
      });

      alert("도서가 등록되었습니다.");
      navigate("/search");
    } catch (error) {
      console.error("도서 등록 실패:", error);
      alert("도서 등록에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SearchNewAddLayout
      title="추가 정보를 입력해주세요."
      subtitle="필수 입력이 아닙니다."
      nextLabel={isSubmitting ? "등록 중..." : "등록"}
      isNextActive={!isSubmitting}
      onClose={handleClose}
      onNext={handleSubmit}
      leftIconType="back"
      step={3}
    >
      <SearchNewAddMoreForm
        imageFile={imageFile}
        onChangeImage={setImageFile}
        intro={intro}
        pages={pages}
        publisher={publisher}
        isbn={isbn}
        pubDate={pubDate}
        onChangeIntro={setIntro}
        onChangePages={setPages}
        onChangePublisher={setPublisher}
        onChangeIsbn={setIsbn}
        onChangePubDate={setPubDate}
      />
    </SearchNewAddLayout>
  );
}