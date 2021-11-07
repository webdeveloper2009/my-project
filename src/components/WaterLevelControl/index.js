import { useState, useCallback, useRef } from "react";
import "./style.css";

const WATER_STEP_HEIGHT = 20;
const ACTION_TIMEOUT = 2000;

export default function WaterLevelControl(props) {
  const waterLevelRef = useRef(0);
  const waterTimerRef = useRef(null);
  const [waterLevel, setWaterLevel] = useState(0);

  const workIncreaseWater = useCallback(() => {
    if (waterLevelRef.current < 5) {
      waterLevelRef.current = waterLevelRef.current + 1;
      setWaterLevel((prev) => prev + 1);
      waterTimerRef.current = setTimeout(workIncreaseWater, ACTION_TIMEOUT);
    }
  }, [waterLevelRef]);

  const workDecreaseWater = useCallback(() => {
    if (waterLevelRef.current > 0) {
      waterLevelRef.current = waterLevelRef.current - 1;
      setWaterLevel((prev) => prev - 1);
      waterTimerRef.current = setTimeout(workDecreaseWater, ACTION_TIMEOUT);
    }
  }, [waterLevelRef]);

  const increaseWaterLevel = useCallback(() => {
    if (waterTimerRef.current !== null) {
      clearTimeout(waterTimerRef.current);
      waterTimerRef.current = null;
    }
    setTimeout(workIncreaseWater, ACTION_TIMEOUT);
  }, [workIncreaseWater]);

  const decreaseWaterLevel = useCallback(() => {
    if (waterTimerRef.current !== null) {
      clearTimeout(waterTimerRef.current);
      waterTimerRef.current = null;
    }
    setTimeout(workDecreaseWater, ACTION_TIMEOUT);
  }, [workDecreaseWater]);

  function DisplayWaterLevel({ waterLevelHeight }) {
    return (
      <div>
        <div
          className="water-style"
          style={{
            height: waterLevelHeight,
          }}
        ></div>
      </div>
    );
  }

  return (
    <div className="body-style">
      <div className="point-style">Current Level : {waterLevel}</div>
      <div className="water-container">
        <DisplayWaterLevel waterLevelHeight={waterLevel * WATER_STEP_HEIGHT} />
      </div>
      <div className="action-style">
        {/*  eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#" className="button-style" onClick={increaseWaterLevel}>
          Increase Water Level
        </a>{" "}
        {/*  eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#" className="button-style" onClick={decreaseWaterLevel}>
          Decrease Water Level
        </a>{" "}
      </div>
    </div>
  );
}
