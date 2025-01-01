declare module "horoscope" {
  interface Horoscope {
    getSign: (date: { month: number; day: number }) => string;
    getZodiacSign: (date: string) => string;
  }

  const horoscope: Horoscope;
  export default horoscope;
}
