import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Brand } from "@/types/api";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  brand?: Brand | null;
  fallbackText: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function BrandLogo({ brand, fallbackText, className, size = "md" }: BrandLogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6 text-[10px]",
    md: "h-10 w-10 text-xs",
    lg: "h-14 w-14 text-sm",
  };

  return (
    <Avatar className={cn(sizeClasses[size], "border border-white/5", className)}>
      {brand?.logoUrl ? (
          <AvatarImage src={brand.logoUrl} alt={brand.name} className="object-cover bg-white" />
      ) : null}
      <AvatarFallback className="bg-gray-800 text-gray-400 font-medium">
        {brand?.name ? brand.name.substring(0, 2).toUpperCase() : fallbackText.substring(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
