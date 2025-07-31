// // App.jsx
// import React, { useState } from "react";
// import Step1Subjects from "./components/Step1Subjects";
// // import Step2Classes from "./components/Step2Classes";
// // import Step3Schedule from "./components/Step3Schedule";
// import s from "./App.module.scss";

// const App = () => {
//   const [step, setStep] = useState(1);
//   const [subjects, setSubjects] = useState({}); // { '5': [{ name, hours }, ...], ... }
//   const [classCounts, setClassCounts] = useState({}); // { '5': 2, '6': 1, ... }

//   return (
//     <div className={s.app}>
//       <h1 className={s.title}>Haftalik Dars Jadvali Quruvchi</h1>

//       <div className={s.stepsIndicator}>
//         <span className={step === 1 ? s.active : ""}>1. Fanlar</span>
//         <span className={step === 2 ? s.active : ""}>2. Sinflar soni</span>
//         <span className={step === 3 ? s.active : ""}>3. Jadval</span>
//       </div>

//       {step === 1 && (
//         <Step1Subjects
//           initialSubjects={subjects}
//           onNext={(data) => {
//             setSubjects(data);
//             setStep(2);
//           }}
//         />
//       )}

//       {step === 2 && (
//         <Step2Classes
//           grades={Object.keys(subjects)}
//           onBack={() => setStep(1)}
//           onNext={(counts) => {
//             setClassCounts(counts);
//             setStep(3);
//           }}
//         />
//       )}

//       {step === 3 && (
//         <Step3Schedule
//           data={{ subjects, classCounts }}
//           onBack={() => setStep(2)}
//         />
//       )}
//     </div>
//   );
// };

// export default App;
