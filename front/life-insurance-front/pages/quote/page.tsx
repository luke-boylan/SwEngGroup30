"use client";
import { useState, useRef, useEffect, useMemo } from "react";

import QuoteQuestion from "@/components/QuoteQuestion/QuoteQuestion";
import Quote from "@/components/Quote/Quote";
import qData from "./questions.json";
import ProgressBar from "@/components/ProgressBar/ProgressBar";

const QuoteBlock = ({
  position,
  current,
  children,
}: {
  position: number;
  current: number;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    if (!ref?.current) return;
    setWidth(ref.current.clientWidth);
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    observer.observe(ref.current);
  }, [ref.current]);

  const rotation = useMemo(() => {
    if (current === position) return "";
    if (current > position) return "rotateY(-10deg)";
    return "rotateY(10deg)";
  }, [current]);

  const style = {
    transform:
      "translateX(" +
      (position - current) * (width || 1000) +
      "px) scale(" +
      (current !== position ? "0.8" : "1") +
      ")" +
      rotation,
    opacity: current !== position ? "0.5" : "1",
  };

  return (
    <div
      style={style}
      ref={ref}
      key={position}
      className={
        "flex justify-center items-center h-full transition duration-500 quote-page-block" +
        (position === 0 ? " z-10" : "")
      }
    >
      {children}
    </div>
  );
};

const QuotePage = () => {
  const [curr, setCurr] = useState<number>(0);
  const [data, setData] = useState<{ [stateName: string]: string }>({});
  const [currentStep, setCurrentStep] = useState<number>(1);

  useEffect(() => {
    qData.map((item): void => {
      item.inputs.map((question) => {
        if (!data.hasOwnProperty(question.stateName)) {
          setData((prev) => ({ ...prev, [question.stateName]: "" }));
        }
      });
    });
  });

  const handleIncrement = () => {
    if (curr === qData.length - 1) return;
    setCurr((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (curr === 0) return;
    setCurr((prev) => prev - 1);
  };

  const handleSubmit = () => {
    setCurrentStep(2);
  };

  const currentComponent = useMemo(() => {
    if (currentStep === 1) {
      return qData.map((item, idx) => (
        <QuoteBlock position={idx} key={idx} current={curr}>
          <QuoteQuestion
            question={item.question}
            onClickNext={handleIncrement}
            onClickBack={handleDecrement}
            onClickSubmit={handleSubmit}
            data={data}
            setData={setData}
            length={qData.length}
            active={curr === idx}
            questionNo={idx + 1}
            newComps={item.inputs}
          />
        </QuoteBlock>
      ));
    }
    if (currentStep === 2)
      return (
        <div className="cover-quote-page">
          <Quote />
        </div>
      );
  }, [currentStep, curr]);

  return (
    <div className="h-screen overflow-x-hidden grad-bg w-full test persp">
      <div className="progress-grid-child flex justify-around items-center">
        <ProgressBar
          number={1}
          label="Questions"
          proportion={Math.floor(((curr + 1) / qData.length) * 100)}
          active={currentStep >= 1}
        />
        <ProgressBar
          number={2}
          label="Your Quote"
          proportion={currentStep >= 2 ? 100 : 0}
          active={currentStep >= 2}
        />
        <ProgressBar
          number={3}
          label="Payment"
          proportion={0}
          active={currentStep >= 3}
        />
      </div>
      {currentComponent}
    </div>
  );
};

export default QuotePage;
