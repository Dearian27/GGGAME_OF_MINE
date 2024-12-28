const Lat1 = new Image();
Lat1.src = "/assets/debris/lat1.png";
const Lat2 = new Image();
Lat2.src = "/assets/debris/lat2.png";
const Lat3 = new Image();
Lat3.src = "/assets/debris/lat3.png";
const backLat1 = new Image();
backLat1.src = "/assets/debris/backLat1.png";
const backLat2 = new Image();
backLat2.src = "assets/debris/backLat2.png";
const backLat3 = new Image();
backLat3.src = "assets/debris/backLat3.png";
const backHalfLat1 = new Image();
backHalfLat1.src = "assets/debris/backHalfLat1.png";
const backHalfLat2 = new Image();
backHalfLat2.src = "assets/debris/backHalfLat2.png";
const proppeler = new Image();
proppeler.src = "assets/debris/proppeler.png";
const body1 = new Image();
body1.src = "assets/debris/body1.png";
const body2 = new Image();
body2.src = "assets/debris/body2.png";
const body3 = new Image();
body3.src = "assets/debris/body3.png";

const details = {
  lats: [
    { img: Lat1, width: 8, height: 20 },
    { img: Lat2, width: 8, height: 20 },
    { img: Lat3, width: 8, height: 20 },
  ],
  backLats: [
    { img: backLat1, width: 8, height: 20 },
    { img: backLat2, width: 8, height: 20 },
    { img: backLat3, width: 8, height: 20 },
    [
      { img: backHalfLat1, width: 8, height: 20 },
      { img: backHalfLat2, width: 8, height: 20 },
    ],
  ],
  proppeler: { img: proppeler, width: 8, height: 20 },
  body: [
    { img: body1, width: 20, height: 8 },
    { img: body2, width: 20, height: 8 },
    { img: body3, width: 20, height: 8 },
  ],
};

export const planeBurst = () => {
  const parts = [];
  parts.push(details.lats[Math.floor(Math.random() * details.lats.length)]);
  if (Math.floor(Math.random() * 2) === 1) {
    parts.push(details.proppeler);
  }
  const backLat =
    details.backLats[Math.floor(Math.random() * details.backLats.length)];
  if (Array.isArray(backLat)) {
    backLat.forEach((el) => {
      parts.push(el);
    });
  } else {
    parts.push(backLat);
  }
  parts.push(details.body[Math.floor(Math.random() * details.body.length)]);

  return parts;
};
