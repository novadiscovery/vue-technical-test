export default function getPrice(id: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const min = 999;
      const max = 3499;
      const number = Math.floor(Math.random() * (max - min)) + min;

      resolve(number);
    }, 1000);
  });
}
