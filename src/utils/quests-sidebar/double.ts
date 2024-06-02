import { type Quest, type User } from "@prisma/client";

type DoubleParams = {
  streak: User["streak"];
  double: User["double_or_nothing"];
  price: Quest["price"];
};

export function double({ streak, double, price }: DoubleParams) {
  let doubledPrice = price;
  let double_or_nothing = double;
  if (double) {
    if (streak <= 7) doubledPrice *= 2;
    else if (streak > 7) {
      double_or_nothing = false;
    }
  }
  return {
    doubledPrice,
    double_or_nothing,
  };
}
