import React, { useState } from "react";
import Chip from "../../components/action/Chip/Chip";
import PlusIcon from "../../assets/icons/plus.svg"; // 여기서 img로 사용

export default function ChipTestPage() {
    const [isActive, setIsActive] = useState(false);

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-100 p-8">
      <section className="space-y-6">
        <Chip
          text="Text"
          variant="icon"
          active={isActive}
          icon={<img src={PlusIcon} alt="Plus Icon"/>}
          onClick={() => setIsActive(!isActive)}
        />

        <Chip
          text="Text"
          variant="none"
          active={true}
        />
      </section>
    </main>
  );
}