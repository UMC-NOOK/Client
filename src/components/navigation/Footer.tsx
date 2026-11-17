import dividerIcon from "../../assets/icons/line-gray-50.svg";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-start pt-6 pb-8 gap-2">
      <span className="text-gray-50 text-body-14-b">NOOK</span>

      <div className="flex items-center gap-2">
        <FooterLink label="소개" />
        <Divider />
        <FooterLink
          label="자주 묻는 질문"
          href="https://booknook-page.notion.site/faq"
        />
        <Divider />
        <FooterLink
          label="이용 약관"
          href="https://booknook-page.notion.site/termsofservice"
        />
        <Divider />
        <FooterLink
          label="개인정보 취급 방침"
          href="https://booknook-page.notion.site/privacypolicy"
        />
      </div>

      <span className="text-gray-50 text-body-12-r">
        메일(고객 전용) : help@booknook.page
      </span>
    </footer>
  );
}

function FooterLink({ label, href }: { label: string; href?: string }) {
  return (
    <a
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noreferrer" : undefined}
      className="text-gray-50 text-body-12-r"
    >
      {label}
    </a>
  );
}

function Divider() {
  return (
    <img
      src={dividerIcon}
      alt=""
      aria-hidden
      className="h-3 w-px"
      draggable={false}
    />
  );
}
