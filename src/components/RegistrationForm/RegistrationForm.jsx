// import { useState } from "react";
// import s from "./HomePage.module.css";
// import lamel1 from "../../assets/lamel1.jpg";

// const HomePage = () => {
//   // Стан для введених параметрів
//   const [sheetSize, setSheetSize] = useState("1.25x2");
//   // const [metalThickness, setMetalThickness] = useState(0.4);
//   const [lamellaHeight, setLamellaHeight] = useState(100);
//   const [lamellaLength, setLamellaLength] = useState(2000);
//   const [lamellaCount, setLamellaCount] = useState(10);
//   const [metalCost, setMetalCost] = useState(200);
//   const [workCost, setWorkCost] = useState(40);
//   const [extraPercent, setExtraPercent] = useState(10);

//   // Додаємо стан для двох коротких П-планок
//   const [pLength, setPLength] = useState(1000);

//   // Стан для результатів розрахунку
//   const [sheetCount, setSheetCount] = useState("-");
//   const [wasteArea, setWasteArea] = useState("-");
//   const [sectionCost, setSectionCost] = useState("-");

//   const calculate = () => {
//     // Визначаємо розміри листа
//     let sheetWidth = sheetSize === "1.25x2" ? 1.25 : 1;
//     let sheetLength = 2;
//     let sheetArea = sheetWidth * sheetLength;

//     // Переводимо одиниці вимірювання
//     let H = lamellaHeight / 1000; // висота ламелі в метрах
//     let L = lamellaLength / 1000; // довжина ламелі в метрах
//     let W = 50 / 1000; // Бічний загин 50 мм = 0,05 м

//     // Площа всіх ламелей
//     let lamellaWidth = H + 2 * W; // Загальна ширина металу для однієї ламелі
//     let lamellaArea = lamellaWidth * L; // Площа металу для однієї ламелі
//     let totalMetalAreaLamellas = lamellaArea * lamellaCount; // Загальна площа для всіх ламелей

//     // ФОРМУЛА ШИРИНИ 1 П-ПЛАНКИ
//     let P_W = Math.sqrt((H * H) / 2) + 0.002 + 2 * 0.045; // Ширина металу для П-планки

//     // Розрахунок П-планок
//     let P_L = pLength / 1000; // Довжина коротких П-планок у метрах
//     let totalMetalAreaP = P_W * L + 2 * (P_W * P_L); // Площа металу для 3 П-планок

//     // Загальна площа металу для секції
//     let totalMetalArea = totalMetalAreaLamellas + totalMetalAreaP;

//     // Кількість листів металу
//     let sheetCount = Math.ceil(totalMetalArea / sheetArea);
//     let totalUsedMetal = sheetCount * sheetArea;

//     // Розрахунок площі відходів
//     let wasteArea = Math.max(totalUsedMetal - totalMetalArea, 0);

//     // Розрахунок вартості секції
//     let materialCostTotal = totalMetalArea * metalCost;
//     let workCostTotal = totalMetalArea * workCost;
//     let extraCosts = (materialCostTotal + workCostTotal) * (extraPercent / 100);
//     let sectionCost = materialCostTotal + workCostTotal + extraCosts;

//     // Оновлення станів
//     setSheetCount(sheetCount);
//     setWasteArea(wasteArea.toFixed(2));
//     setSectionCost(sectionCost.toFixed(2));
//   };

//   return (
//     <div className={s.wrapper}>
//       <div className={s.box}>
//         <h2>Калькулятор секції паркану</h2>

//         {/* Вибір параметрів */}
//         <label>Розмір листа:</label>
//         <select
//           value={sheetSize}
//           onChange={(e) => setSheetSize(e.target.value)}
//         >
//           <option value="1.25x2">1,25 × 2 м</option>
//           <option value="1x2">1 × 2 м</option>
//         </select>

//         <label>Висота ламелі (мм):</label>
//         <input
//           type="number"
//           value={lamellaHeight}
//           onChange={(e) => setLamellaHeight(parseInt(e.target.value))}
//           min="50"
//           max="500"
//         />

//         <label>Довжина ламелі (мм):</label>
//         <select
//           value={lamellaLength}
//           onChange={(e) => setLamellaLength(parseInt(e.target.value))}
//         >
//           <option value="2000">2000 мм</option>
//           <option value="2500">2500 мм</option>
//           <option value="3000">3000 мм</option>
//         </select>

//         <label>Кількість ламелей у секції:</label>
//         <input
//           type="number"
//           value={lamellaCount}
//           onChange={(e) => setLamellaCount(parseInt(e.target.value))}
//           min="1"
//         />

//         <label>Довжина двох коротких П-планок (мм):</label>
//         <input
//           type="number"
//           value={pLength}
//           onChange={(e) => setPLength(parseInt(e.target.value))}
//           min="1000"
//           max="2000"
//         />

//         <label>Вартість металу (грн/м²):</label>
//         <input
//           type="number"
//           value={metalCost}
//           onChange={(e) => setMetalCost(parseFloat(e.target.value))}
//         />

//         <label>Вартість роботи (грн/м²):</label>
//         <input
//           type="number"
//           value={workCost}
//           onChange={(e) => setWorkCost(parseFloat(e.target.value))}
//         />

//         <label>Додаткові витрати (%):</label>
//         <input
//           type="number"
//           value={extraPercent}
//           onChange={(e) => setExtraPercent(parseFloat(e.target.value))}
//         />

//         <button onClick={calculate}>Розрахувати</button>

//         <h3>Результати для секції:</h3>
//         <ul>
//           <li>
//             <strong>Кількість листів металу:</strong> {sheetCount}
//           </li>
//           <li>
//             <strong>Площа відходів (м²):</strong> {wasteArea}
//           </li>

//           <li>
//             <strong>Вартість секції + вартість відходів (грн):</strong>{" "}
//             {sectionCost}
//           </li>
//         </ul>

//         <img src={lamel1} alt="Ламель" />
//       </div>
//     </div>
//   );
// };

// export default HomePage;
