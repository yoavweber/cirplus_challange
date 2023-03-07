import { MachineContext } from "./stateMachine";
import { Location } from "../Enteties/enteties";
import { compareObj } from "../utils";

const playerWon = (playerLocation: Location, GPgpLocation: Location[]) => {
  return GPgpLocation.some(
    (location) =>
      location.Row === playerLocation.Row &&
      location.Column === playerLocation.Column
  );
};

export const isUserWon = (context: MachineContext) => {
  const { userLocation, GPgpLocation, pbLocation } = context;
  if (userLocation && GPgpLocation && pbLocation) {
    return (
      playerWon(userLocation, GPgpLocation) ||
      compareObj(userLocation, pbLocation)
    );
  }
  return false;
};

export const isPbWon = (context: MachineContext) => {
  const { pbLocation, GPgpLocation } = context;
  if (pbLocation && GPgpLocation) {
    return playerWon(pbLocation, GPgpLocation);
  }
  return false;
};
