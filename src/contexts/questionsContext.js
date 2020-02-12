import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
export const QuestionContext = createContext();

export const QuestionProvider = props => {
  const [answers, setAnswers] = useState(null);
  const [globalQuestionsList, setGlobalQuestionsList] = useState([]);
  return (
    <QuestionContext.Provider
      value={{
        answers,
        setAnswers,
        globalQuestionsList,
        setGlobalQuestionsList
      }}
    >
      {props.children}
    </QuestionContext.Provider>
  );
};

QuestionProvider.propTypes = {
  children: PropTypes.node
};
