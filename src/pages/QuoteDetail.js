import { useEffect } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { Route } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/hooks/use-http";
import { getSingleQuote } from "../lib/lib/api";

const QuoteDetail = () => {
  const { sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote, true);
  const match = useRouteMatch();
  const params = useParams();

  useEffect(() => {
    sendRequest(params.quoteId);
  }, [sendRequest, params.quoteId])

  if (status === "pending") {
    return <div className="centered">
      <LoadingSpinner />
    </div>
  }

  if (error) {
    return <p className="centered focused">{error}</p>
  }

  if (!loadedQuote.text) {
    return <p>No quote found!</p>
  }

  return (
    <>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={`${match.path}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </>
  );
};

export default QuoteDetail;
