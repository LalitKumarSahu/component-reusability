import React, { useState } from "react";

function FeedbackForm({ device }) {
  const [recycled, setRecycled] = useState("no");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    console.log({ device, recycled, notes });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
    setRecycled("no");
    setNotes("");
  };

  return (
    <section className="feedback">
      <h3>Share Your Recycling Experience</h3>
      <form onSubmit={submit} className="feedback-form">
        <label>
          Device: <strong>{device}</strong>
        </label>
        <label htmlFor="recycled-status">Did you recycle successfully?</label>
        <select
          id="recycled-status"
          value={recycled}
          onChange={(e) => setRecycled(e.target.value)}
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <label htmlFor="notes">Notes (optional)</label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any comments?"
        />
        <button type="submit" className="feedback-btn">
          Submit Feedback
        </button>
        {submitted && (
          <p className="success">Thanks! Feedback recorded (demo only).</p>
        )}
      </form>
    </section>
  );
}

export default FeedbackForm;
