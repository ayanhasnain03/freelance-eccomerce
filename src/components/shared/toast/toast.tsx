import { cn } from "../../../lib/utils";
import { AnimatedList } from "../../ui/animated-list";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-5",

        "transition-all duration-300 ease-in-out transform hover:scale-105",

        "bg-white shadow-lg hover:shadow-xl",

        "dark:bg-gray-800 dark:text-white dark:border dark:border-gray-700 dark:shadow-xl",
      )}
    >
      <div className="flex flex-row items-center gap-4">
        <div
          className="flex items-center justify-center rounded-full w-12 h-12"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex items-center text-lg font-semibold dark:text-white">
            <span className="text-base sm:text-lg">{name}</span>
            <span className="mx-2">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal text-gray-700 dark:text-white/80">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedListDemo({
  className,
  name,
  description,
  icon,
  color,
  time,
}: {
  className?: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  time: string;
}) {
  return (
    <div
      className={cn(
        "absolute flex flex-col overflow-hidden rounded-lg w-full",
        className,
      )}
    >
      <AnimatedList>
        <Notification
          name={name}
          description={description}
          icon={icon}
          color={color}
          time={time}
        />
      </AnimatedList>
    </div>
  );
}
