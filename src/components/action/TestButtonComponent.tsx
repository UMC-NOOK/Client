import Button from "./ButtonComponent";
import Chip from "./ChipComponent";
import IconButtonComponent from "./IconButtonComponent";
import TextWithIconButtonComponent from "./TextWithIconChipComponent";

export default function TestButtonComponet() {
  return (
    <div className="min-h-screen p-6 space-y-6 bg-slate-50 bg-[linear-gradient(180deg,_#0E1430_0%,_#0E101B_100%)]">
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
            <IconButtonComponent size="s">
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
            </IconButtonComponent>
        </div>
      </section>

      {/* TextWithIconButtonLike 테스트 */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold">TextWithIconButtonLike</h2>

        <div className="flex items-center gap-3">
          <TextWithIconButtonComponent
            text="구유경"
            icon={
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1040_279)">
                  <path
                    d="M11.3574 2.02398C11.5283 1.85316 11.8052 1.85319 11.9761 2.02398C12.1469 2.1948 12.1469 2.47176 11.9761 2.64263L7.62045 6.99997L11.9761 11.3573C12.1469 11.5282 12.1469 11.8051 11.9761 11.976C11.8052 12.1468 11.5283 12.1468 11.3574 11.976L7.0018 7.61862L2.64275 11.976C2.47188 12.1468 2.19492 12.1468 2.0241 11.976C1.85331 11.8051 1.85328 11.5281 2.0241 11.3573L6.38315 6.99997L2.0241 2.64263C1.85328 2.47181 1.85331 2.19485 2.0241 2.02398C2.19492 1.85316 2.47188 1.85319 2.64275 2.02398L7.0018 6.38132L11.3574 2.02398Z"
                    fill="#8B94B2"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1040_279">
                    <rect width="14" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            }
            onIconClick={() => alert("구유경 아이콘 클릭")}
          />

          <TextWithIconButtonComponent
            text="치즈 이야기"
            icon={
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1040_279)">
                  <path
                    d="M11.3574 2.02398C11.5283 1.85316 11.8052 1.85319 11.9761 2.02398C12.1469 2.1948 12.1469 2.47176 11.9761 2.64263L7.62045 6.99997L11.9761 11.3573C12.1469 11.5282 12.1469 11.8051 11.9761 11.976C11.8052 12.1468 11.5283 12.1468 11.3574 11.976L7.0018 7.61862L2.64275 11.976C2.47188 12.1468 2.19492 12.1468 2.0241 11.976C1.85331 11.8051 1.85328 11.5281 2.0241 11.3573L6.38315 6.99997L2.0241 2.64263C1.85328 2.47181 1.85331 2.19485 2.0241 2.02398C2.19492 1.85316 2.47188 1.85319 2.64275 2.02398L7.0018 6.38132L11.3574 2.02398Z"
                    fill="#8B94B2"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1040_279">
                    <rect width="14" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            }
            onIconClick={() => alert("치즈 이야기 아이콘 클릭")}
          />
        </div>
      </section>
    </div>
  );
}
