import { useState, Fragment } from 'react';
import { buildFeedbackPath, extractFeedback } from '../api/feedback';

const FeedbackPage = (props) => {
    const [feedbackData, setFeedbackData] = useState();

    const loadFeedbackHandler = (id) => {
        fetch(`/api/${id}`)
            .then((res) => res.json())
            .then((data) => setFeedbackData(data.feedback))
            .catch((err) => console.error(err));
    };

    return (
        <Fragment>
            {feedbackData && <p>{feedbackData.email}</p>}
            <ul>
                {props.feedbackItems.map((item) => (
                    <li key={item.id}>
                        {item.feedback}
                        <button
                            onClick={loadFeedbackHandler.bind(null, item.id)}
                        >
                            Show Details
                        </button>
                    </li>
                ))}
            </ul>
        </Fragment>
    );
};

export const getStaticProps = async () => {
    // do not use fetch to access internal api
    // only for external apis
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    return {
        props: {
            feedbackItems: data,
        },
    };
};

export default FeedbackPage;
