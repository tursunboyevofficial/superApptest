import React from "react";
import s from "./Step3Schedule.module.scss";

const days = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma"];

const Step3Schedule = ({ data, onBack, onNext }) => {
  const { subjects, classCounts } = data;

  const shuffleArray = (array) => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const generateSchedule = (subjectsList) => {
    const schedule = [[], [], [], [], []]; // 5 kun

    let subjectQueue = [];

    subjectsList.forEach((subj) => {
      for (let i = 0; i < subj.hours; i++) {
        subjectQueue.push(subj.name);
      }
    });

    subjectQueue = shuffleArray(subjectQueue);

    let day = 0;
    while (subjectQueue.length) {
      schedule[day].push(subjectQueue.shift());
      day = (day + 1) % 5;
    }

    return schedule;
  };

  const handleNext = () => {
    onNext();
  };

  const isDataEmpty = Object.values(subjects).every((list) => list.length === 0);

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>3-bosqich: Haftalik dars jadvali</h2>

      <div className={s.actions}>
        <button onClick={onBack}>⬅️ Orqaga</button>
        <button onClick={() => window.print()}>🖨 Jadvalni chop etish</button>
      </div>

      {isDataEmpty ? (
        <p className={s.warning}>❗ Iltimos, fanlarni va soatlarini avval kiriting.</p>
      ) : (
        <div className={s.scheduleWrapper}>
          {Object.entries(subjects).map(([grade, subjectList]) => {
            const classCount = classCounts[grade] || 0;

            return [...Array(classCount)].map((_, i) => {
              const schedule = generateSchedule(subjectList);

              return (
                <div key={`${grade}-${i}`} className={s.tableCard}>
                  <h3>{grade}-sinf {String.fromCharCode(65 + i)}</h3>
                  <table className={s.table}>
                    <thead>
                      <tr>
                        <th>Kun</th>
                        <th>Darslar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.map((lessons, idx) => (
                        <tr key={idx}>
                          <td>{days[idx]}</td>
                          <td>
                            {lessons.map((l, j) => (
                              <span key={j}>
                                {l}
                                {j < lessons.length - 1 ? ", " : ""}
                              </span>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            });
          })}
        </div>
      )}

      <div className={s.actions}>
        <button onClick={onBack}>⬅️ Orqaga</button>
        <button onClick={handleNext}>Davom etish ➡️</button>
      </div>
    </div>
  );
};

export default Step3Schedule;
