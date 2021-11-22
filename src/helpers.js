import { v4 as uuid } from "uuid";

const stepsArray = Array(50)
  .fill(2)
  .map((e, i) => Math.pow(e, i))
  .slice(1);

export const calculateTotalSteps = (steps, stepLimit) => {
  console.log({ stepsArray, steps, stepLimit });
  const stepsArraySliceIndex = stepsArray.findIndex((e) => e === stepLimit);
  const stepsArraySliced = stepsArray.slice(0, stepsArraySliceIndex + 1);
  const stepsSum = stepsArraySliced.reduce((acc, cur) => acc + cur, 0);
  return stepsSum + steps;
};

export const initialiazePositions = (n) => {
  let robotStart1 = 0;
  let robotStart2 = 0;
  const buffer = Math.floor(n / 5);

  while (robotStart1 === robotStart2) {
    // buffer used to place robots near to center rather then at ends
    robotStart1 = Math.floor(Math.random() * (n - buffer)) + buffer;
    robotStart2 = Math.floor(Math.random() * (n - buffer)) + buffer;
  }
  return { robotStart1, robotStart2 };
};

export const getRailArray = (trackLength) =>
  Array(trackLength)
    .fill(0)
    .map(() => uuid());
