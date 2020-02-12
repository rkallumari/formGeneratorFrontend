import React, { useContext } from "react";
import { Grid, Typography, Paper, makeStyles, Button } from "@material-ui/core";
import { QuestionContext } from "../contexts/questionsContext";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link } from "react-router-dom";

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
  },
  preview: {
    height: "35vh",
    overflowY: "scroll",
    marginDown: theme.spacing(2),
    padding: theme.spacing(2)
  },
  question: {
    fontWeight: "bold"
  }
}));

export const QuestionsPreview = props => {
  const classes = useStyles();
  const { answers, globalQuestionsList } = useContext(QuestionContext);
  let content = (
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
            Preview
          </Typography>
          {globalQuestionsList && globalQuestionsList.length && answers ? (
            <Grid className={classes.preview} style={{}}>
              {globalQuestionsList.map((item, index) => (
                <Grid>
                  <Typography variant="body1" className={classes.question}>
                    {item.question}
                  </Typography>
                  <Typography variant="body2">{answers[item.key]}</Typography>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body2">
              {" "}
              Sorry no preview available to display!
            </Typography>
          )}
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-end"
          >
            <Button
              item
              justify="flex-start"
              variant="contained"
              startIcon={<ArrowBackIosIcon />}
              component={Link}
              to="./questions"
              className={classes.buttons}
            >
              Back to Questions
            </Button>
            <Button
              item
              justify="flex-end"
              variant="contained"
              color="primary"
              startIcon={<NavigateNextIcon />}
              component={Link}
              to="./downloads"
              className={classes.buttons}
            >
              Proceed to download
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
  return content;
};
