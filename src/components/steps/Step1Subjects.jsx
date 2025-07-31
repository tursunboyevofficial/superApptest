import React, { useState } from "react";
import s from "./Step1Subjects.module.scss";

const Step1Subjects = ({ data, setData, onNext }) => {
  const [subjects, setSubjects] = useState(() => {
    const initial = { 1: [], 2: [], 3: [], 4: [] };
    const fromData = data.subjects || {};
    return {
      1: Array.isArray(fromData[1]) ? fromData[1] : [],
      2: Array.isArray(fromData[2]) ? fromData[2] : [],
      3: Array.isArray(fromData[3]) ? fromData[3] : [],
      4: Array.isArray(fromData[4]) ? fromData[4] : [],
    };
  });

  const [inputs, setInputs] = useState({
    1: { name: "", hours: "" },
    2: { name: "", hours: "" },
    3: { name: "", hours: "" },
    4: { name: "", hours: "" },
  });
  const [editing, setEditing] = useState({});

  const handleChange = (grade, field, value) => {
    setInputs((prev) => ({
      ...prev,
      [grade]: {
        ...prev[grade],
        [field]: value,
      },
    }));
  };

  const handleAddSubject = (grade) => {
    const { name, hours } = inputs[grade];
    if (!name || !hours) return;

    const updated = {
      ...subjects,
      [grade]: [...(subjects[grade] || []), { name, hours: parseInt(hours) }],
    };

    setSubjects(updated);
    setInputs((prev) => ({
      ...prev,
      [grade]: { name: "", hours: "" },
    }));
  };

  const handleRemoveSubject = (grade, index) => {
    const updated = {
      ...subjects,
      [grade]: (subjects[grade] || []).filter((_, idx) => idx !== index),
    };
    setSubjects(updated);
  };

  const handleEdit = (grade, index) => {
    setEditing({ grade, index });
    const subject = subjects[grade][index];
    setInputs((prev) => ({
      ...prev,
      [grade]: { name: subject.name, hours: subject.hours },
    }));
  };

  const handleSaveEdit = (grade, index) => {
    const updated = [...subjects[grade]];
    updated[index] = { ...inputs[grade], hours: parseInt(inputs[grade].hours) };

    setSubjects((prev) => ({
      ...prev,
      [grade]: updated,
    }));

    setEditing({});
    setInputs((prev) => ({
      ...prev,
      [grade]: { name: "", hours: "" },
    }));
  };

  const handleNext = () => {
    setData({ ...data, subjects });
    onNext();
  };

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>1-bosqich: Fanlar va Soatlar</h2>

      <div className={s.gridNewStyle}>
        {[1, 2, 3, 4].map((grade) => (
          <div key={grade} className={s.cardNew}>
            <div className={s.header}>
              <h3>{grade}-sinf fanlar roʻyxati</h3>
            </div>

            <div className={s.inputGroupRow}>
              <input
                type="text"
                placeholder="Fan nomi"
                value={inputs[grade].name}
                onChange={(e) => handleChange(grade, "name", e.target.value)}
              />
              <input
              className={s.inputGroupRow1}
                type="number"
                placeholder="Soat"
                value={inputs[grade].hours}
                onChange={(e) => handleChange(grade, "hours", e.target.value)}
              />
              {editing.grade === grade ? (
                <button
                  className={s.saveBtn}
                  onClick={() => handleSaveEdit(grade, editing.index)}
                >
                  💾
                </button>
              ) : (
                <button className={s.addBtn} onClick={() => handleAddSubject(grade)}>
                  ➕
                </button>
              )}
            </div>

            <ul className={s.todoListNew}>
              {(subjects[grade] || []).map((subj, idx) => (
                <li key={idx} className={s.todoItemNew}>
                  <div className={s.todoText}>
                    📘 <strong>{subj.name}</strong> — {subj.hours} soat
                  </div>
                  <div className={s.btnGroup}>
                    <button onClick={() => handleEdit(grade, idx)}>✏️</button>
                    <button onClick={() => handleRemoveSubject(grade, idx)}>❌</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={s.actions}>
        <button onClick={handleNext}>Davom etish</button>
      </div>
    </div>
  );
};

export default Step1Subjects;