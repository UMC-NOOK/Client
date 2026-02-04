import Button from "./ButtonComponent";
import Chip from "./ChipComponent";
import IconComponent from "./IconComponent";

export default function TestButtonComponet() {
  return (
    <div className="min-h-screen p-6 space-y-6 bg-slate-50">
      {/* Button 테스트 */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold">Button</h2>

        <div className="space-x-3">
          <Button>기본(default)</Button>
          <Button variant="dark">다른(dark)</Button>
          <Button variant="danger">제거(danger)</Button>
        </div>

        <div className="space-x-3">
          <Button onClick={() => alert("clicked!")}>클릭 테스트</Button>
          <Button disabled>비활성(disabled)</Button>
        </div>

        <div className="space-x-3">
          <Button>텍스트가 길어지면 버튼도 같이 늘어나요</Button>
        </div>
      </section>

      {/* Chip 테스트 */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold">Chip</h2>

        <div className="flex flex-wrap gap-3">
          <Chip>미선택(default)</Chip>
          <Chip variant="selected">선택(selected)</Chip>
          <Chip>텍스트가 길어지면 칩도 같이 늘어나요</Chip>
          <Chip disabled>비활성(disabled)</Chip>
        </div>

        <div className="flex flex-wrap gap-3">
          <Chip onClick={() => alert("chip clicked!")}>칩 클릭 테스트</Chip>
          <Chip variant="selected" onClick={() => alert("selected chip!")}>
            선택 칩 클릭
          </Chip>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold">IconFrame (size="s")</h2>

        <div className="flex items-center gap-4">
            <IconComponent size="s">
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full">
                    <path
                        d="M16.2196 0.219608C16.5124 -0.0732298 16.9872 -0.0731753 17.2802 0.219608C17.573 0.512442 17.5729 0.987234 17.2802 1.28015L9.81336 8.74988L17.2802 16.2196C17.5729 16.5125 17.573 16.9873 17.2802 17.2802C16.9872 17.5729 16.5124 17.573 16.2196 17.2802L8.75281 9.81043L1.28015 17.2802C0.987234 17.5729 0.512442 17.573 0.219608 17.2802C-0.0731754 16.9872 -0.0732298 16.5124 0.219608 16.2196L7.69226 8.74988L0.219608 1.28015C-0.0732298 0.98732 -0.0731754 0.512528 0.219608 0.219608C0.512442 -0.0732298 0.987234 -0.0731754 1.28015 0.219608L8.75281 7.68933L16.2196 0.219608Z"
                        fill="#ECECEC"
                    />
                </svg>
            </IconComponent>
        </div>
      </section>
    </div>
  );
}
