import {
  ArrowRight,
  Lightbulb,
  Brain,
  ClipboardList,
  BarChart3,
  Target,
} from "lucide-react";
import "./JourneyFlow.css";

const JourneyFlow = () => {
  const steps = [
    { id: 1, label: "الفكرة", Icon: Lightbulb },
    { id: 2, label: "التحليل الذكي", Icon: Brain },
    { id: 3, label: "الخطة", Icon: ClipboardList },
    { id: 4, label: "المقاييس", Icon: BarChart3 },
    { id: 5, label: "عرض المستثمرين", Icon: Target },
  ];

  return (
    <div className="journey-flow">
      <h3 className="journey-title">رحلتك مع Risepreneur</h3>
      <div className="journey-steps">
        {steps.map((step, index) => {
          const IconComponent = step.Icon;
          return (
            <div key={step.id} className="journey-step-wrapper">
              <div className="journey-step">
                <div className="journey-icon">
                  <IconComponent size={32} strokeWidth={2} />
                </div>
                <div className="journey-label">{step.label}</div>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="journey-arrow" size={24} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JourneyFlow;
