import { useRef } from 'react';

function HomePage() {
    const emailInput = useRef();
    const feedbackInput = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = emailInput.current.value;
        const feedback = feedbackInput.current.value;

        const reqBody = { email, feedback };

        fetch('/api/feedback', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    return (
        <div>
            <h1>The Home Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Your Email Address
                        <input type="email" id="email" ref={emailInput} />
                    </label>
                </div>
                <div>
                    <label>
                        Your Feedback
                        <textarea
                            id="feedback"
                            rows="5"
                            ref={feedbackInput}
                        ></textarea>
                    </label>
                </div>
                <button>Send Feedback</button>
            </form>
        </div>
    );
}

export default HomePage;
