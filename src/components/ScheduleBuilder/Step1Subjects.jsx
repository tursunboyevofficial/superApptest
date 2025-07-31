import React, { useState } from "react";
import s from "./Step1Subjects.module.scss";

const Step1Subjects = ({ onNext }) => {
  const initialSubjects = {
    5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [],
  };
  const [subjects, setSubjects] = useState(initialSubjects);

  const [inputs, setInputs] = useState({
    5: { name: "", hours: "" },
    6: { name: "", hours: "" },
    7: { name: "", hours: "" },
    8: { name: "", hours: "" },
    9: { name: "", hours: "" },
    10: { name: "", hours: "" },
    11: { name: "", hours: "" },
  });

  const handleChange = (grade, field, value) => {
    setInputs((prev) => ({
      ...prev,
      [grade]: { ...prev[grade], [field]: value },
    }));
  };

  const handleAddSubject = (grade) => {
    const { name, hours } = inputs[grade];

    if (!name || !hours || isNaN(hours) || parseInt(hours) <= 0) return;

    const newSubject = { name, hours: parseInt(hours, 10) };
    setSubjects((prev) => ({
      ...prev,
      [grade]: [...prev[grade], newSubject],
    }));

    // inputni tozalash
    setInputs((prev) => ({
      ...prev,
      [grade]: { name: "", hours: "" },
    }));
  };

  const handleNext = () => {
    onNext(subjects);
  };

  return (
    <div>
      <h2 className={s.title}>1-qadam: Har sinf uchun fan va soatlarini kiriting</h2>
      {Object.keys(subjects).map((grade) => (
        <div key={grade} className={s.grade}>
          <h3>{grade}-sinf</h3>
          <div className={s.inputGroup}>
            <input
              type="text"
              placeholder="Fan nomi"
              value={inputs[grade].name}
              onChange={(e) => handleChange(grade, "name", e.target.value)}
            />
            <input
              type="number"
              placeholder="Soat (haftasiga)"
              value={inputs[grade].hours}
              onChange={(e) => handleChange(grade, "hours", e.target.value)}
            />
            <button type="button" onClick={() => handleAddSubject(grade)}>
              Qo‘shish
            </button>
          </div>

          <ul className={s.list}>
            {subjects[grade].map((subj, i) => (
              <li key={i} className={s.item}>
                {subj.name} — {subj.hours} soat
              </li>
            ))}
          </ul>
        </div>
      ))}

      <button className={s.btnNext} onClick={handleNext}>
        Davom etish
      </button>
    </div>
  );
};

export default Step1Subjects;
