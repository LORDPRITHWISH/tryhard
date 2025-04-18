import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

export const FeatureCard = ({ title, description, icon, className }: FeatureCardProps) => {
  return (
    <div 
      className={cn(
        "p-6 rounded-2xl backdrop-blur-lg",
        "border border-white/10 bg-black/30",
        "transition-all duration-300 hover:bg-black/40",
        "group cursor-pointer",
        className
      )}
    >
      <div className="space-y-4">
        {icon}
        <h3 className="text-xl font-semibold text-white group-hover:text-white/90">
          {title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};