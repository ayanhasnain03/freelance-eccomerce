import { useState, useEffect } from "react";
import moment from "moment";

export default function CountdownTimer() {

  const saleDate = "07-12-2024";

  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const now = moment();

      const endDate = moment(saleDate, "DD-MM-YYYY");

      const duration = moment.duration(endDate.diff(now));

      if (duration.asMilliseconds() > 0) {
        const timeLeft = `${duration.days()}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
        setRemainingTime(timeLeft);
      } else {
        setRemainingTime("Sale Ended");
      }
    };

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [saleDate]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center font-noto text-red-600">
        {remainingTime}
      </h1>
    </div>
  );
}
