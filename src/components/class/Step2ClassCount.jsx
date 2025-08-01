import s from './Step2ClassCount.module.scss'
import React, { useState, useEffect } from "react";

const Step2ClassCount = ({ data, setData, onNext, onBack }) => {
  const [counts, setCounts] = useState(
    data.classCounts || {
      1: "",
      2: "",
      3: "",
      4: "",
    }
  );

  const handleChange = (grade, value) => {
    setCounts((prev) => ({
      ...prev,
      [grade]: value,
    }));
  };

  const handleNext = () => {
    const parsed = {};
    for (let key in counts) {
      parsed[key] = parseInt(counts[key]) || 0;
    }
    setData({ ...data, classCounts: parsed });
    onNext();
  };

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>2-bosqich: Sinflar sonini kiriting !</h2>

      <div className={s.grid}>
        {[1, 2, 3, 4].map((grade) => (
          <div key={grade} className={s.card}>
            <label>{grade}-sinf</label>
            <input
              type="number"
              min="1"
              placeholder="Masalan: 3"
              value={counts[grade]}
              onChange={(e) => handleChange(grade, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className={s.actions}>
        <button onClick={onBack}>⬅️ Orqaga</button>
        <button onClick={handleNext}>Davom etish ➡️</button>
      </div>
    </div>
  );
};

export default Step2ClassCount;
