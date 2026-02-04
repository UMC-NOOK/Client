// Client/src/components/layout/Footer/Footer.tsx
import dividerIcon from "../../assets/search/search-field-text.svg";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-start pt-6 pb-8 gap-2">
      <span className="text-gray-500 text-body-14-b">NOOK</span>

      <div className="flex items-center gap-2">
        <FooterLink label="소개" />
        <Divider />
        <FooterLink label="자주 묻는 질문" />
        <Divider />
        <FooterLink label="이용 약관" />
        <Divider />
        <FooterLink label="개인정보 취급 방침" />
      </div>

      <span className="text-gray-500 text-body-12-r">
        메일(고객 전용) : help@bnook.kr
      </span>

      <span className="mt-1 text-gray-500 text-body-12-r self-stretch">
        사업자 등록번호 : 302-01-12345
      </span>
    </footer>
  );
}

function FooterLink({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="text-gray-500 text-body-12-r"
    >
      {label}
    </button>
  );
}

function Divider() {
  return (
    <img
      src={dividerIcon}
      alt=""
      aria-hidden
      className="w-px h-3"
      draggable={false}
    />
  );
}
