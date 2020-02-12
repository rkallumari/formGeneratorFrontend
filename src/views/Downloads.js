import React, { useState, useContext } from "react";
import { Grid, Typography, Paper, makeStyles, Button } from "@material-ui/core";
import API from "../helpers/API";
import { QuestionContext } from "../contexts/questionsContext";
import LinearProgress from "@material-ui/core/LinearProgress";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link } from "react-router-dom";

var fileDownload = require("js-file-download");

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

export const Downloads = () => {
  const { answers } = useContext(QuestionContext);
  const [loading, setLoading] = useState(false);
  const downloadPdf = () => {
    setLoading(true);
    API.makeAPostCall(
      "/generateDocument",
      { pdf: true, answers: answers },
      function(response) {
        setLoading(false);
        fileDownload(response.data, "output.pdf");
      },
      { responseType: "blob" }
    );
  };
  const downloadWord = () => {
    setLoading(true);
    API.makeAPostCall(
      "/generateDocument",
      { pdf: false, answers: answers },
      function(response) {
        setLoading(false);
        fileDownload(response.data, "output.docx");
      },
      { responseType: "blob" }
    );
  };
  const classes = useStyles();
  let content = (
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
          <Paper className={classes.paper} justify="space-between">
            <Typography variant="h6">
              Thanks for answering the questions! Your file is ready to be
              downloaded. Click below links
            </Typography>
            {loading ? <LinearProgress /> : null}
            <Grid
              container
              justify="space-between"
              direction="column"
              alignItems="flex-start"
            >
              <Button
                justify="flex-start"
                disabled={loading}
                item
                onClick={downloadPdf}
                color="primary"
                variant="contained"
                className={classes.buttons}
              >
                Click to download PDF
              </Button>
              <Button
                justify="flex-start"
                disabled={loading}
                item
                onClick={downloadWord}
                color="primary"
                variant="contained"
                className={classes.buttons}
              >
                Click to download Word
              </Button>
            </Grid>
            <Button
              item
              justify="flex-start"
              variant="contained"
              startIcon={<ArrowBackIosIcon />}
              component={Link}
              to="./preview"
              className={classes.buttons}
            >
              Back to Preview
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
  return content;
};
