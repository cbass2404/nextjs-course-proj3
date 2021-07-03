import { buildFeedbackPath, extractFeedback } from '../api/feedback';

const FeedbackPage = (props) => {
    return (
        <ul>
            {props.feedbackItems.map((item) => {
                <li key={item.id}>{item.feedback}</li>;
            })}
        </ul>
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
