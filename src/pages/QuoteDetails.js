import { useEffect } from "react";
import { Link, Routes, Route, useParams } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

function QuoteDetails() {
  const params = useParams();

  const {
    sendRequest,
    status,
    data: quote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(params.quoteId);
  }, [sendRequest, params.quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="cenetered focused">{error}</p>;
  }

  if (!quote.text) {
    return <p className="cenetered focused">No quote found</p>;
  }

  const loadComment = (
    <div className="centered">
      <Link className="btn--flat" to="comments">
        Load Comments
      </Link>
    </div>
  );

  return (
    <>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Routes>
        <Route path="" element={loadComment} />
        <Route path="comments" element={<Comments />} />
      </Routes>
    </>
  );
}

export default QuoteDetails;
