import { useRef } from "react";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  // const [isFocused, setIsFocused] = useState(false);
  const authorInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    if (enteredAuthor.trim() === "" || enteredText.trim() === "") {
      return;
    }

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  // function formFocusHandler() {
  //   setIsFocused(true);
  // }

  // function buttonClickHandler() {
  //   setIsFocused(false);
  // }

  return (
    <>
      {/* <Prompt
        when={isFocused}
        message={(location) => "Are you sure? All data will be lost!"}
      /> */}
      <Card>
        <form
          // onFocus={formFocusHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button className="btn">Add Quote</button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default QuoteForm;
