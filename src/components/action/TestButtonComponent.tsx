import Button from "./ButtonComponent";
import Chip from "./ChipComponent";

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
    </div>
  );
}
