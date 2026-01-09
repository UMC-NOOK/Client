import { useEffect, useMemo, useState } from "react";
import { EQ_FRAMES } from "./EqualizerFrames";

type Props = {
    isPlaying: boolean;
    speedMs?: number;
    phase?: number;
    className?: string;
};

export default function AnimatedEqIcon({ isPlaying, speedMs = 120, phase = 0, className }: Props) {
    const len = EQ_FRAMES.length;
    const [tick, setTick] = useState(0);
    const start = useMemo(() => ((phase % len) + len) % len, [phase, len]);

    useEffect(() => {
        if (!isPlaying) return; 
        const id = setInterval(() => setTick(t => (t + 1) % len), speedMs);
        return () => clearInterval(id);
    }, [isPlaying, speedMs, len]);

    const Frame = EQ_FRAMES[(start + tick) % len];
        return (
            <div className={className}>
                <Frame />
        </div>
    );
}
