import { useState, useEffect, useCallback, useRef } from "react";
import RailRoad from "./RailRoad";
import { initialiazePositions, getRailArray } from "../helpers";
import "../index.css";

const trackLength = 100;

function SpiralSearch() {
  const initialPositions = useRef(initialiazePositions(trackLength));

  const rail = useRef(getRailArray(trackLength));
  const [steps, setSteps] = useState(0);
  const [stepLimit, setStepLimit] = useState(2);

  const [robot1Position, setRobot1Position] = useState(
    initialPositions.current.robotStart1
  );
  const [robot2Position, setRobot2Position] = useState(
    initialPositions.current.robotStart2
  );

  const [robot1isMovingRight, setRobot1isMovingRight] = useState(true);
  const [robot2isMovingRight, setRobot2isMovingRight] = useState(true);

  const [found, setFound] = useState(false);

  const walk = useCallback(
    (
      initialPosition,
      robotPosition,
      setPositionFunc,
      movingRight,
      setDirectionFunc
    ) => {
      const onAParachute =
        robotPosition === initialPositions.current.robotStart1 ||
        robotPosition === initialPositions.current.robotStart2;
      const onOwnParachute = robotPosition === initialPosition;
      if (onAParachute && !onOwnParachute) {
        // stop moving if other robot's parachute is found
        return;
      } else if (steps === stepLimit) {
        setDirectionFunc((direction) => !direction);
        setSteps(0);
        setStepLimit(stepLimit * 2);
      } else {
        const newPosition = robotPosition + (movingRight ? 1 : -1);
        setPositionFunc(newPosition);
        setSteps((steps) => steps + 1);
      }
    },
    [stepLimit, steps]
  );

  useEffect(() => {
    let ID1;
    if (robot1Position !== robot2Position) {
      ID1 = setTimeout(() => {
        walk(
          initialPositions.current.robotStart1,
          robot1Position,
          setRobot1Position,
          robot1isMovingRight,
          setRobot1isMovingRight
        );
        walk(
          initialPositions.current.robotStart2,
          robot2Position,
          setRobot2Position,
          robot2isMovingRight,
          setRobot2isMovingRight
        );
      }, 100);
    } else {
      setFound(true);
    }
    return () => {
      clearTimeout(ID1);
    };
  }, [
    robot1Position,
    robot1isMovingRight,
    robot2Position,
    robot2isMovingRight,
    walk,
  ]);

  return (
    <div className="SpiralSearch">
      <div className="text">
        {found ? <h1>FOUND! 🎯</h1> : <h1>Looking 👀</h1>}
      </div>
      {robot1Position < 0 || robot2Position < 0 ? <h1>◀</h1> : null}
      <RailRoad
        rail={rail}
        initialPositions={initialPositions}
        robot1Position={robot1Position}
        robot2Position={robot2Position}
      />
      {robot1Position > trackLength || robot2Position > trackLength ? (
        <h1>▶</h1>
      ) : null}
    </div>
  );
}

export default SpiralSearch;
