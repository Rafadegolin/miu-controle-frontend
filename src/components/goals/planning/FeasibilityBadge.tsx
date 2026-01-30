import { Badge } from "@/components/ui/badge";

interface Props {
  isViable: boolean;
  className?: string;
}

export function FeasibilityBadge({ isViable, className }: Props) {
  return (
    <Badge
      variant={isViable ? "default" : "destructive"}
      className={`${className} ${
        isViable
          ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/50"
          : "bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/50"
      } border`}
    >
      {isViable ? "Viável 🟢" : "Inviável 🔴"}
    </Badge>
  );
}
