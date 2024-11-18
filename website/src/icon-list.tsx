import { getIconList } from "omni-file";
import { useEffect, useState, useRef } from "react";

interface IconListProps {
  brightness: number;
  opacity: number;
}

interface IconItemProps {
  icon: string;
  brightness: number;
  opacity: number;
}

const IconItem = ({ icon, brightness, opacity }: IconItemProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "500px" }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div ref={ref} className="flex items-center gap-4">
      {isVisible ? (
        <img
          src={`/omni-file/icons/${icon}.svg`}
          alt={icon}
          title={icon}
          className="w-6 h-6"
          style={{
            filter: `brightness(${brightness}) opacity(${opacity}%)`,
          }}
        />
      ) : (
        <div className="w-6 h-6" />
      )}
      <span className="text-sm text-muted-foreground">{icon}</span>
    </div>
  );
};

export function IconList({ brightness, opacity }: IconListProps) {
  const iconList = getIconList();

  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-foreground">All Icons</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4">
        {iconList.map((icon) => (
          <IconItem
            key={icon}
            icon={icon}
            brightness={brightness}
            opacity={opacity}
          />
        ))}
      </div>
    </div>
  );
}
