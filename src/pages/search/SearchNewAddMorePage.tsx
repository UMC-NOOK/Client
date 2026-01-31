import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchNewAddLayout from "../../components/search/new/SearchNewAddLayout";
import SearchNewAddMoreForm from "../../components/search/new/SearchNewAddMoreForm";
import { useShell } from "../../app/AppShell";

export default function SearchNewAddMorePage() {
  const { setHideFooter } = useShell();

  useEffect(() => {
    setHideFooter(true);
    return () => setHideFooter(false);
  }, [setHideFooter]);

  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [intro, setIntro] = useState("");
  const [pages, setPages] = useState("");
  const [publisher, setPublisher] = useState("");
  const [isbn, setIsbn] = useState("");
  const [pubDate, setPubDate] = useState({ yyyy: "", mm: "", dd: "" });

  const handleClose = () => navigate(-1);

  const handleSubmit = () => {
    console.log({ imageFile, intro, pages, publisher, pubDate, isbn });
  };

  return (
    <SearchNewAddLayout
      title="추가 정보를 입력해주세요."
      subtitle="필수 입력이 아닙니다."
      nextLabel="등록"
      isNextActive={true}
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
