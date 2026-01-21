// src/pages/SearchDirectAddPage.tsx
//도서 직접 추가 _ 라우팅 테스트용
import { useNavigate } from "react-router-dom";

export default function SearchDirectAddPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-start gap-4 pt-4 px-4">
      <button 
        onClick={() => navigate(-1)}
        className="text-[#ECECEC] text-sm underline"
      >
        &lt; 뒤로가기
      </button>
      
      <h1 className="text-[#ECECEC] text-xl font-bold">
        직접 도서 추가하기
      </h1>
      <p className="text-[#A2A7C3] text-sm">
      </p>
    </div>
  );
}