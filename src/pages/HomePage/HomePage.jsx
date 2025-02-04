import { useState } from "react";
import s from "./HomePage.module.css";

// import foto from "../../assets/bg-1.jpg";
// import foto2x from "../../assets/bg-2x.jpg";
// import fotoTab from "../../assets/bg-tab.jpg";
// import fotoTab2x from "../../assets/home-tab-2x.jpg";
// import fotoMob from "../../assets/bg-mob.jpg";
// import fotoMob2x from "../../assets/bg-mob-2x.jpg";

const HomePage = () => {
  // Стани для вхідних даних
  const [sheetSize, setSheetSize] = useState("1.25x2");
  const [detailWidth, setDetailWidth] = useState("");
  const [detailLength, setDetailLength] = useState("");
  const [materialCost, setMaterialCost] = useState("");
  const [workCost, setWorkCost] = useState("");
  const [extraPercent, setExtraPercent] = useState("");

  // Стани для результатів
  const [detailCount, setDetailCount] = useState("-");
  const [wasteArea, setWasteArea] = useState("-");
  const [detailCost, setDetailCost] = useState("-");
  const [detailCostWithWaste, setDetailCostWithWaste] = useState("-");

  function calculate() {
    let sheetWidth = sheetSize === "1.25x2" ? 1.25 : 1;
    let sheetLength = 2;
    let sheetArea = sheetWidth * sheetLength;

    let width = parseFloat(detailWidth);
    let length = parseFloat(detailLength);
    let matCost = parseFloat(materialCost);
    let workC = parseFloat(workCost);
    let extraP = parseFloat(extraPercent) / 100;

    if (
      isNaN(width) ||
      isNaN(length) ||
      isNaN(matCost) ||
      isNaN(workC) ||
      isNaN(extraP)
    ) {
      alert("Будь ласка, введіть коректні значення!");
      return;
    }

    let detailArea = width * length;
    let count = Math.floor(sheetArea / detailArea);
    let usedArea = count * detailArea;
    let waste = sheetArea - usedArea;

    let baseCost = detailArea * (matCost + workC);
    let finalCost = baseCost + baseCost * extraP;
    let wasteCost = waste * matCost;
    let finalCostWithWaste = finalCost + wasteCost / count;

    setDetailCount(count);
    setWasteArea(waste.toFixed(2));
    setDetailCost(finalCost.toFixed(2));
    setDetailCostWithWaste(finalCostWithWaste.toFixed(2));
  }

  return (
    <div className={s.box}>
      <h2>Калькулятор розкрою листа під відливи</h2>

      <label>Виберіть розмір листа:</label>
      <select value={sheetSize} onChange={(e) => setSheetSize(e.target.value)}>
        <option value="1.25x2">1,25 × 2 м</option>
        <option value="1x2">1 × 2 м</option>
      </select>

      <label>Ширина деталі (м):</label>
      <input
        type="number"
        value={detailWidth}
        onChange={(e) => setDetailWidth(e.target.value)}
        step="0.01"
        min="0.01"
      />

      <label>Довжина деталі (м):</label>
      <input
        type="number"
        value={detailLength}
        onChange={(e) => setDetailLength(e.target.value)}
        step="0.01"
        min="0.01"
      />

      <label>Вартість матеріалу (грн/м²):</label>
      <input
        type="number"
        value={materialCost}
        onChange={(e) => setMaterialCost(e.target.value)}
        step="1"
        min="0"
      />

      <label>Вартість роботи (грн/м²):</label>
      <input
        type="number"
        value={workCost}
        onChange={(e) => setWorkCost(e.target.value)}
        step="1"
        min="0"
      />

      <label>Додаткові витрати (%):</label>
      <input
        type="number"
        value={extraPercent}
        onChange={(e) => setExtraPercent(e.target.value)}
        step="1"
        min="0"
      />

      <button onClick={calculate}>Розрахувати</button>

      <h3>Результати:</h3>
      <ul>
        <li>
          <strong>Кількість деталей:</strong>{" "}
          <span className={s.wasteArea}>{detailCount}</span>
        </li>
        <li>
          <strong>Площа відходів (м²):</strong>{" "}
          <span className={s.wasteArea}>{wasteArea}</span>
        </li>
        <li>
          <strong>Вартість однієї деталі (грн):</strong>{" "}
          <span className={s.wasteArea}>{detailCost}</span>
        </li>
        <li>
          <strong>
            Вартість деталі з урахуванням металу у відходах (грн):
          </strong>{" "}
          <span className={s.wasteArea}>{detailCostWithWaste}</span>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
