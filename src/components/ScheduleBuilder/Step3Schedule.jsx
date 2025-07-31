import React from "react";
import s from "./Step3Schedule.module.scss";

const days = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];
const parallels = ["A", "B", "C", "D", "E"];

const Step3Schedule = ({ data, onBack }) => {
  const { subjects, classCounts } = data;

  const generateSchedule = (subjectsList) => {
    const allSubjects = [...subjectsList];
    const schedule = [[], [], [], [], [], []]; // 6 kun

    let subjectIndex = 0;

    for (let day = 0; day < 6; day++) {
      for (let lesson = 0; lesson < 6; lesson++) {
        if (subjectIndex >= allSubjects.length) {
          subjectIndex = 0;
        }
        schedule[day].push(allSubjects[subjectIndex]);
        subjectIndex++;
      }
    }

    return schedule;
  };

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>3-qadam: Dars jadvalini avtomatik yaratish</h2>

      {Object.keys(subjects).map((gradeKey) => {
        const grade = parseInt(gradeKey, 10);
        const subjectList = subjects[grade] || [];

        if (subjectList.length === 0 || !classCounts[grade]) return null;

        const schedule = generateSchedule(subjectList.map((s) => s.name));
        const classCount = classCounts[grade];

        return (
          <div key={grade} className={s.gradeBlock}>
            <h3 className={s.gradeTitle}>{grade}-sinf</h3>
            {[...Array(classCount)].map((_, idx) => {
              const classLetter = parallels[idx] || `+${idx + 1}`;
              return (
                <div key={classLetter} className={s.classBlock}>
                  <h4 className={s.classTitle}>{grade}-{classLetter} sinf</h4>
                  <table className={s.table}>
                    <thead>
                      <tr>
                        <th>Kun</th>
                        {[...Array(6)].map((_, i) => (
                          <th key={i}>{i + 1}-dars</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {days.map((day, i) => (
                        <tr key={i}>
                          <td>{day}</td>
                          {schedule[i].map((subj, j) => (
                            <td key={j}>{subj}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        );
      })}

      <div className={s.buttons}>
        <button onClick={onBack} className={s.backBtn}>
          ⬅️ Ortga
        </button>
        <button
          onClick={() => window.print()}
          className={s.printBtn}
        >
          🖨 Chop etish
        </button>
      </div>
    </div>
  );
};

export default Step3Schedule;
