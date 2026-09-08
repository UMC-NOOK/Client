type Variant = "Primary" | "Secondary" | "Alert";

type Props = {
  context: string;
  variant: Variant
  onClick?:()=>void;
  className?: string;
}
const variantClassMap: Record<Variant, string> = {
  Primary: "bg-mint-60 text-gray-10",
  Secondary: "bg-gray-25 text-gray-70",
  Alert: "bg-red-20 text-red-1",
};

export default function ButtonContanier({
    context,
    variant="Secondary",
    onClick,
    className=""
} : Props){
    return(
        <div className={`
            flex w-full justify-center rounded-lg px-6 py-4 text-btn-16-sb
            ${variantClassMap[variant]}
            ${className}`}
            onClick={onClick}>
            {context}
        </div>
    )
}