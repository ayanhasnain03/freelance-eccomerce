import { useState, useEffect } from "react";
import moment from "moment";

export default function CountdownTimer({ saleDate }: { saleDate: string }) {
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const updateTimer = () => {
      const now = moment();
      const endDate = moment(saleDate, "DD-MM-YYYY");
      const duration = moment.duration(endDate.diff(now));

      if (duration.asMilliseconds() > 0) {
        setRemainingTime({
          days: duration.days(),
          hours: duration.hours(),
          minutes: duration.minutes(),
          seconds: duration.seconds(),
        });
      } else {
        clearInterval(intervalId);
        setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer(); 
    intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [saleDate]);

  const hasEnded = remainingTime.days === 0 && remainingTime.hours === 0 && remainingTime.minutes === 0 && remainingTime.seconds === 0;

  return (
    <div className="flex flex-col items-center">
      {hasEnded ? (
        <h1 className="text-3xl font-dancing text-center text-gray-600 mb-4">
          Sale Ended
        </h1>
      ) : (
        <div className="flex space-x-4">
          <div className="text-center">
            <span className="text-4xl font-dancing text-red-600">{remainingTime.days}</span>
            <p className="text-sm text-gray-600">Days</p>
          </div>
          <div className="text-center">
            <span className="text-4xl font-dancing text-red-600">{remainingTime.hours}</span>
            <p className="text-sm text-gray-600">Hours</p>
          </div>
          <div className="text-center">
            <span className="text-4xl font-dancing text-red-600">{remainingTime.minutes}</span>
            <p className="text-sm text-gray-600">Minutes</p>
          </div>
          <div className="text-center">
            <span className="text-4xl font-dancing text-red-600">{remainingTime.seconds}</span>
            <p className="text-sm text-gray-600">Seconds</p>
          </div>
        </div>
      )}
    </div>
  );
}