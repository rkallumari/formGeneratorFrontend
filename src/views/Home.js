import React, { useContext, useEffect } from "react";
import { Grid, Typography, Link } from "@material-ui/core";
import { Image } from "../components/Image";
import { Link as RouterLink } from "react-router-dom";
import { QuestionContext } from "../contexts/questionsContext";

export const Home = () => {
  const { setAnswers, setGlobalQuestionsList } = useContext(QuestionContext);
  useEffect(() => {
    setAnswers(null);
    setGlobalQuestionsList([]);
  }, []);
  return (
    <Grid container justify="flex-start" direction="column" alignItems="center">
      <Grid item xs={12} xl={2} lg={4} md={6} sm={8}>
        <Image
          src={
            "https://cdn0.iconfinder.com/data/icons/essential-pack-4/512/4-2-512.png"
          }
        />
      </Grid>
      <Grid item xs={12} xl={12} lg={12} md={12} sm={12}>
        <Typography variant="h5" align="center">
          Welcome to form and letter generator
        </Typography>
        <Typography variant="body2" align="center">
          <Link to="./questions" component={RouterLink}>
            Click Here to start answering the question to generate your letter
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};
