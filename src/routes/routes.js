import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Home, Questions, Downloads, QuestionsPreview } from "../views";
import { Layout } from "../components";
import { QuestionContext } from "../contexts/questionsContext";

export const AppRoutes = props => {
  const { answers, globalQuestionsList } = useContext(QuestionContext);
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Layout>
            <Home {...props} />
          </Layout>
        )}
      />
      <Route
        exact
        path="/questions"
        render={() => (
          <Layout>
            <Questions {...props} />
          </Layout>
        )}
      />
      <Route
        exact
        path="/preview"
        render={() =>
          globalQuestionsList && globalQuestionsList.length && answers ? (
            <Layout>
              <QuestionsPreview {...props} />
            </Layout>
          ) : (
            <Redirect to={{ pathname: "/" }} {...props} />
          )
        }
      />
      <Route
        exact
        path="/downloads"
        render={() =>
          globalQuestionsList && globalQuestionsList.length && answers ? (
            <Layout>
              <Downloads {...props} />
            </Layout>
          ) : (
            <Redirect to={{ pathname: "/" }} {...props} />
          )
        }
      />
    </Switch>
  );
};
