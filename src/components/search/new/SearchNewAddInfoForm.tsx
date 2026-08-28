// Client/src/components/search/new/SearchNewAddInfoForm.tsx
import { TextField } from "../../input/textinput/TextField";

type Props = {
  title: string;
  author: string;
  onChangeTitle: (v: string) => void;
  onChangeAuthor: (v: string) => void;
};

export default function SearchNewAddInfoForm({
  title,
  author,
  onChangeTitle,
  onChangeAuthor,
}: Props) {
  return (
    <div className="w-full flex flex-col gap-8">
      <TextField
        title="제목"
        value={title}
        onChange={onChangeTitle}
        placeholder="책의 제목을 입력해주세요."
      />

      <TextField
        title="저자"
        value={author}
        onChange={onChangeAuthor}
        placeholder="책의 저자를 입력해주세요."
      />
    </div>
  );
}