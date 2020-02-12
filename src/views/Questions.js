import React, { useEffect, useState, useContext } from "react";
import { Grid, Typography, Paper, makeStyles, Button } from "@material-ui/core";
import API from "../helpers/API";
import { QuestionContext } from "../contexts/questionsContext";
import { Question } from "../components/question";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { notify } from "../components";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  buttons: {
    marginTop: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  root: {
    flexGrow: 1,
    width: "100%"
  },
  body: {
    height: "80vh"
  },
  content: {
    height: "40vh"
  },
  heading: {
    textAlign: "center"
  }
}));

export const Questions = props => {
  const history = useHistory();
  const { answers, setAnswers, setGlobalQuestionsList } = useContext(
    QuestionContext
  );
  const [questionList, setQuestionList] = useState([]);
  const [questionInUse, setQuestionInUse] = useState({});
  const [index, setIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  useEffect(() => {
    API.makeAGetCall("/getAllQuestions", function(response) {
      console.log(response);
      setQuestionList(response);
    });
  }, []);
  useEffect(() => {
    if (questionList && questionList.length)
      setQuestionInUse(questionList[index]);
  }, [questionList, index]);
  useEffect(() => {
    if (answers && answers[questionInUse.key]) {
      setCurrentAnswer(answers[questionInUse.key]);
    } else {
      setCurrentAnswer("");
    }
  }, [questionInUse, answers]);
  const classes = useStyles();
  const updateAnswers = (key, answer) => {
    if (answers) {
      answers[key] = answer;
      setAnswers(answers);
    } else {
      var ans = {};
      ans[key] = answer;
      setAnswers(ans);
    }
  };
  const handleBack = () => {
    if (index) setIndex(index - 1);
  };
  const handleNext = () => {
    if (!currentAnswer) notify("Please give an answer to proceed!");
    else {
      updateAnswers(questionInUse.key, currentAnswer);
      if (index < questionList.length - 1) setIndex(index + 1);
      else handleFinish();
    }
  };
  const handleFinish = () => {
    console.log("finished!");
    setGlobalQuestionsList(questionList);
    history.push("./preview");
  };
  return (
    <div className={classes.root}>
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.body}
      >
        <Grid
          item
          xs={10}
          sm={8}
          md={8}
          lg={8}
          xl={6}
          className={classes.content}
        >
          <Paper className={classes.paper}>
            <Typography variant="h4" className={classes.heading}>
              Answer this questions
            </Typography>
            {questionList && questionList.length && questionInUse ? (
              <Question
                question={questionInUse.question}
                setAnswer={setCurrentAnswer}
                answer={currentAnswer}
              />
            ) : (
              <Typography variant="body2">
                {" "}
                Sorry no questions to display!
              </Typography>
            )}
            {questionList && questionList.length && questionInUse ? (
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-end"
              >
                <Button
                  onClick={handleBack}
                  disabled={
                    questionList &&
                    questionList.length &&
                    questionList[0].key === questionInUse.key
                  }
                  variant="contained"
                  item
                  justify="flex-start"
                  className={classes.buttons}
                  startIcon={<ArrowBackIosIcon />}
                >
                  Back
                </Button>
                {questionList &&
                questionList.length &&
                questionInUse &&
                questionList[questionList.length - 1].key ===
                  questionInUse.key ? (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.buttons}
                    onClick={handleNext}
                    item
                    justify="flex-end"
                  >
                    Finish
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.buttons}
                    onClick={handleNext}
                    item
                    justify="flex-end"
                    endIcon={<NavigateNextIcon />}
                  >
                    Save Answer and proceed
                  </Button>
                )}
              </Grid>
            ) : null}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
