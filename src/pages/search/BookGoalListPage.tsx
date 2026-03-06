import React from "react";
import { BookGoal } from "../../components/content/card/BookGoal/BookGoal";

export default function ReadingGoalTestPage() {
  return (
        <div className="rounded-[16px] bg-[#0B0F23] p-1">
          <div className="flex flex-col gap-4">
            {/* 1) 독서 목표 설정 */}
            <BookGoal
              percent="ZERO"
              message="독서 목표를 설정하세요!"
            />

            {/* 2) 0% (100권 남음) */}
            <BookGoal
              percent="ZERO"
              message="100권까지 100권 남았어요."
            />

            {/* 3) 1~9% (99권 남음) */}
            <BookGoal
              percent="PCT_1_9"
              message="100권까지 99권 남았어요."
            />

            {/* 4) 50~59% (49권 남음) */}
            <BookGoal
              percent="PCT_50_59"
              message="100권까지 49권 남았어요."
            />

            {/* 5) 100% (달성) */}
            <BookGoal
              percent="PCT_100"
              message="목표를 달성했어요!"
            />
          </div>
        </div>
    );
}