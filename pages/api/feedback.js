import fs from 'fs';
import path from 'path';

export const buildFeedbackPath = () => {
    return path.join(process.cwd(), 'data', 'feedback.json');
};

export const extractFeedback = (filePath) => {
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    return data;
};

const handler = (req, res) => {
    if (req.method === 'POST') {
        const { email, feedback } = req.body;

        const newFeedback = {
            id: new Date().toISOString(),
            email,
            feedback,
        };

        const filePath = buildFeedbackPath();
        const data = extractFeedback(filePath);
        data.push(newFeedback);
        fs.writeFileSync(filePath, JSON.stringify(data));

        res.status(201).json({ message: 'Success!', feedback: newFeedback });
    } else {
        const filePath = buildFeedbackPath();
        const data = extractFeedback(filePath);
        res.status(200).json({ data });
    }
};

export default handler;
