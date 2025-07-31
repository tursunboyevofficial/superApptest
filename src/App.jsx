import { useState } from "react";
import Step1Subjects from "./components/steps/Step1Subjects";
import Step2ClassCount from "./components/class/Step2ClassCount";
import Step3Schedule from "./components/courseTable/Step3Schedule";
import ScheduleBuilder from "./components/ScheduleBuilder/ScheduleBuilder";
import "./App.css";

function App() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    subjects: {},
    classCounts: {},
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="App">
      {step === 1 && (
        <Step1Subjects
          data={data}
          setData={setData}
          onNext={nextStep}
        />
      )}

      {step === 2 && (
        <Step2ClassCount
          data={data}
          setData={setData}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {step === 3 && (
        <Step3Schedule
          data={data}
          setData={setData}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {step === 4 && (
        <ScheduleBuilder
          data={data}
          onBack={prevStep}
        />
      )}
      
    </div>
  );
}

export default App;
