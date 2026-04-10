export default function getGoalPercent(progressPercent: number){
    if(progressPercent == 0) return "ZERO";
    if(progressPercent < 10) return "PCT_1_9";
    if(progressPercent < 20) return "PCT_10_19";
    if(progressPercent < 30) return "PCT_20_29";
    if(progressPercent < 40) return "PCT_30_39";
    if(progressPercent < 50) return "PCT_40_49";
    if(progressPercent < 60) return "PCT_50_59";
    if(progressPercent < 70) return "PCT_60_69";
    if(progressPercent < 80) return "PCT_70_79";
    if(progressPercent < 90) return "PCT_80_89";
    if(progressPercent < 100) return "PCT_90_99";
    if(progressPercent == 100) return "PCT_100";
    
    return "ZERO";
}