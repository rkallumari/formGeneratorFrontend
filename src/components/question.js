import React from "react";
import { Typography, Grid, FilledInput } from "@material-ui/core";
import PropTypes from "prop-types";

export const Question = props => {
  return (
    <Grid>
      <Typography variant="body1">{props.question}</Typography>
      <FilledInput
        autoFocus={true}
        color="primary"
        type="text"
        multiline={true}
        required={true}
        margin="dense"
        disableUnderline={true}
        fullWidth
        onChange={e => props.setAnswer(e.target.value)}
        value={props.answer}
        rows={3}
      />
    </Grid>
  );
};

Question.propTypes = {
  question: PropTypes.string,
  setAnswer: PropTypes.func,
  answer: PropTypes.string
};
