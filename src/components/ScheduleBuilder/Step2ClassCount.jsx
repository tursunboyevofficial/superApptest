import React from "react";
import s from "./Step2ClassCount.module.scss";

const Step2ClassCount = ({ data, onBack, onNext, classCounts, setClassCounts }) => {
  const grades = [5, 6, 7, 8, 9, 10, 11];

  const handleChange = (grade, value) => {
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue) && numericValue > 0) {
      setClassCounts((prev) => ({ ...prev, [grade]: numericValue }));
    } else if (value === "") {
      // inputni bo‘shatganda qiymatni tozalash
      setClassCounts((prev) => {
        const updated = { ...prev };
        delete updated[grade];
        return updated;
      });
    }
  };

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>
        2-qadam: Har bir sinf uchun nechta sinf mavjudligini kiriting
      </h2>

      <div className={s.grid}>
        {grades.map((grade) => (
          <div key={grade} className={s.gradeBlock}>
            <label className={s.label}>{grade}-sinf uchun sinflar soni:</label>
            <input
              type="number"
              min={1}
              placeholder="Masalan: 2"
              value={classCounts[grade] || ""}
              onChange={(e) => handleChange(grade, e.target.value)}
              className={s.input}
            />
          </div>
        ))}
      </div>

      <div className={s.buttons}>
        <button onClick={onBack} className={s.backBtn}>
          ⬅️ Ortga
        </button>
        <button onClick={onNext} className={s.nextBtn}>
          Keyingi ➡️
        </button>
      </div>
    </div>
  );
};

export default Step2ClassCount;
