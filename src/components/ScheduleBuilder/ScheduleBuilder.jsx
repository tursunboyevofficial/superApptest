import React, { useState } from "react";
import Step1Subjects from "./Step1Subjects";
import Step2ClassCount from "./Step2ClassCount";
import Step3Schedule from "./Step3Schedule";
import s from "./ScheduleBuilder.module.scss";

const ScheduleBuilder = () => {
  const [step, setStep] = useState(1);

  const [subjects, setSubjects] = useState({
    5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: []
  });

  const [classCounts, setClassCounts] = useState({
    5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1
  });

  const handleSubjectsNext = (updatedSubjects) => {
    setSubjects(updatedSubjects);
    setStep(2);
  };

  const handleClassCountsNext = (updatedCounts) => {
    setClassCounts(updatedCounts);
    setStep(3);
  };

  const handleBackToSubjects = () => setStep(1);
  const handleBackToClassCounts = () => setStep(2);

  return (
    <div className={s.container}>
      <h1 className={s.title}>Dars Jadval Tuzuvchi</h1>

      <div className={s.steps}>
        <div className={`${s.step} ${step === 1 ? s.active : ""}`}>1. Fanlarni kiriting</div>
        <div className={`${s.step} ${step === 2 ? s.active : ""}`}>2. Har sinf uchun necha "klass" bor?</div>
        <div className={`${s.step} ${step === 3 ? s.active : ""}`}>3. Jadvalni ko‘rish</div>
      </div>

      {step === 1 && <Step1Subjects onNext={handleSubjectsNext} />}
      {step === 2 && (
        <Step2ClassCount
          data={subjects}
          classCounts={classCounts}
          setClassCounts={setClassCounts}
          onNext={handleClassCountsNext}
          onBack={handleBackToSubjects}
        />
      )}
      {step === 3 && (
        <Step3Schedule
          data={{ subjects, classCounts }}
          onBack={handleBackToClassCounts}
        />
      )}
    </div>
  );
};

export default ScheduleBuilder;
