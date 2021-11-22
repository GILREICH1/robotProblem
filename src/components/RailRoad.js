import classNames from "classnames";
import { FaParachuteBox } from "react-icons/fa";

const RailRoad = ({
  rail,
  initialPositions,
  robot1Position,
  robot2Position,
}) => {
  const { current } = initialPositions;

  const railDisplay = rail.current.map((e, i) => {
    const classes = classNames("track", {
      robot1: i === robot1Position,
      robot2: i === robot2Position,
    });

    if (i === current.robotStart1)
      return (
        <FaParachuteBox
          key={e}
          className={classes}
          style={{ color: "yellow" }}
        />
      );
    if (i === current.robotStart2)
      return (
        <FaParachuteBox
          key={e}
          className={classes}
          style={{ color: "green" }}
        />
      );

    return <span key={e} className={classes}></span>;
  });

  return <div className="railRoad">{railDisplay}</div>;
};

export default RailRoad;
