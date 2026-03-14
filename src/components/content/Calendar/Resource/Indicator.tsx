import None from "../../../../assets/icons/base.svg";
import Per_0 from "../../../../assets/icons/percent0.svg";
import Per_25 from "../../../../assets/icons/percent25.svg";
import Per_50 from "../../../../assets/icons/percent50.svg";
import Per_75 from "../../../../assets/icons/percent75.svg";
import Per_100 from "../../../../assets/icons/percent100.svg";

type Percent = "none" | "0" | "25" | "50" | "75" | "100";

type Props = {
    percent: Percent;
};

const indicatorMap: Record<Percent, string> = {
  "none": None,
  "0": Per_0,
  "25": Per_25,
  "50": Per_50,
  "75": Per_75,
  "100": Per_100,
};

export default function Indicator({
    percent
}: Props){
    const src = indicatorMap[percent];

    return <img src={src} alt={`indicator-${percent}`} />;
}