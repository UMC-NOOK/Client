//Users/suzy/Projects/Client/src/pages/LibraryMobilePage.tsx
import { useNavigate } from "react-router-dom";

export default function LibraryMobilePage() {
  const navigate = useNavigate();
  return (
    <div className="mt-8 text-[#ECECEC]">
      {/* TODO(담당자): 서재 페이지 UI 구현 */}
      <div className="text-[20px] font-semibold">서재 (TODO)</div>
      <button onClick={() => navigate("/library/123")}>Click me</button>{" "}
      {/* debug button */}
    </div>
  );
}
