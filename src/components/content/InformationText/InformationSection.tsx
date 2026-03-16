import SectionHeader from "./SectionHeader" 

type InformationSectionFlow = "vertical" | "horizontal"; 

type Props = { 
  flow: InformationSectionFlow; 
  top: string; 
  bottom: string; 
  onToggle?: (open: boolean) => void; 
  onClick?: () => void; 
}; 

export default function InformationSection({ 
  flow, 
  top, 
  bottom, 
  onToggle,
  onClick, 
}: Props) { 
  if (flow === "vertical") { 
    return ( 
      <div className="flex w-full flex-col items-start gap-3"> 
        <SectionHeader size="14" top={top} onToggle={onToggle} onClick={onClick} /> 
          <p className="w-full self-stretch text-body-14-r text-gray-90"> 
            {bottom} 
          </p> 
      </div> 
    ); 
  } 
    
  return ( 
    <div className="flex w-full items-start gap-3"> 
      <div className="flex h-[21px] shrink-0 flex-col items-start justify-center"> 
        <span className="text-label-14-sb text-gray-90">
            {top}
          </span> 
      </div> 
      
      <p className="min-w-0 flex-1 text-body-14-r text-gray-90"> 
          {bottom} 
      </p> 
    </div> 
  ); 
}