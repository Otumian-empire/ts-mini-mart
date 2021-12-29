// in typeorm `money` is a string even though the type of the field is number
export const convertMoneyToNumber = (money: string): number => {
  return Number(money.substring(1).trim());
};
