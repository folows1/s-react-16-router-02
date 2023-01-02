import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/hooks/use-http";
import { addQuote } from "../lib/lib/api";

const NewQuote = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const hist = useHistory();

  useEffect(() => {
    if (status === "completed") {
      hist.push("/quotes");
    }
  }, [status, hist])

  const addQuoteHandler = (quoteData) => {
    console.log(quoteData);

    sendRequest(quoteData);
  };
  return <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />;
};

export default NewQuote;
