import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './Quiz.css';

const itemsPerPage = 1;

function Quiz() {
    const [start, setStart] = useState(false);
    const [score, setScore] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedAns, setSelectedAns] = useState({});
    const [quizProgram, setQuizProgram] = useState([]);
    const [finish, setFinish] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [answeredQuestions, setAnsweredQuestions] = useState(new Set());

    const quiz = [
        { id: 1, question: "What is React primarily used for?", choices: ["Server-side rendering", "Building user interfaces", "Managing databases", "Writing unit tests"], answer: "Building user interfaces" },
        { id: 2, question: "Which method in React is used to update the state?", choices: ["setState()", "changeState()", "updateState()", "modifyState()"], answer: "setState()" },
        { id: 3, question: "What does JSX stand for?", choices: ["JavaScript XML", "JavaScript XHTML", "JavaScript Extended", "JavaScript eXtension"], answer: "JavaScript XML" },
        { id: 4, question: "Which of the following is a way to pass data from a parent component to a child component in React?", choices: ["state", "props", "methods", "functions"], answer: "props" },
        { id: 5, question: "What is the default port number in which the React development server runs?", choices: ["8080", "3000", "4200", "8000"], answer: "3000" },
        { id: 6, question: "Which hook is used to manage state in functional components?", choices: ["useState", "useReducer", "useContext", "useEffect"], answer: "useState" },
        { id: 7, question: "What is the purpose of the useEffect hook?", choices: ["To fetch data from an API", "To handle state changes", "To perform side effects in function components", "To create reusable components"], answer: "To perform side effects in function components" },
        { id: 8, question: "What keyword is used to create a new React component?", choices: ["new", "react", "component", "function"], answer: "function" },
        { id: 9, question: "How do you import React in a file?", choices: ["import React from 'react';", "include React from 'react';", "get React from 'react';", "fetch React from 'react';"], answer: "import React from 'react';" },
        { id: 10, question: "Which method is called immediately after a component is added to the DOM?", choices: ["componentWillMount", "componentDidMount", "componentWillUpdate", "componentDidUpdate"], answer: "componentDidMount" }
    ];

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const total = Math.ceil(quiz.length / itemsPerPage);
        setTotalPages(total);
        const currentItem = quiz.slice(startIndex, endIndex);
        setQuizProgram(currentItem);
    }, [currentPage]);

    function handleStart() {
        setStart(true);
    }

    function handlePrevious() {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    }

    function handleNext() {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
        if (currentPage === totalPages - 1) {
            setFinish(true);
        }
    }

    function handleReset() {
        setSelectedAns(prev => {
            const newSelectedAns = { ...prev };
            delete newSelectedAns[currentPage];
            return newSelectedAns;
        });

        setAnsweredQuestions(prev => {
            const newAnsweredQuestions = new Set(prev);
            newAnsweredQuestions.delete(currentPage);
            return newAnsweredQuestions;
        });
    }

    function handleClick(answer, questionId) {
        if (!answeredQuestions.has(questionId)) {
            const correctAnswer = quiz.find(q => q.id === questionId).answer;
            if (correctAnswer === answer) {
                setScore(prevScore => prevScore + 1);
            }
            setAnsweredQuestions(prev => new Set(prev).add(questionId));
            setSelectedAns(prev => ({ ...prev, [questionId]: answer }));
        }
    }

    function handleSubmit() {
        setSubmit(true);
    }

    const note = {
        color: "red"
    };
    const para = {
        color: "gray",
        fontSize: '12px',
    };

    return (
        <div>
            {start ? (
                <div className='mainPages'>
                    {submit ? (
                        <div className='scoreBoard'>
                            <p>{`Score ${score}/10`}</p>
                            {quiz.map(q => (
                                <div key={q.id}>
                                    <ul>{q.id}. {q.question}</ul>
                                    <p>Correct answer: {q.answer}</p>
                                    <p>Your answer: {selectedAns[q.id] || "Not answered"}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='quizDiv'>
                            {quizProgram.map(questions => (
                                <ul key={questions.id}><h5>{questions.id}. {questions.question}</h5>
                                    {questions.choices.map((choice, index) => (
                                        <div key={index} className={`choice ${selectedAns[questions.id] === choice ? 'selected' : ''} ${answeredQuestions.has(questions.id) ? 'disabled' : ''}`}>
                                            <label className='label'>
                                                <input className="radio" type="radio" name={`radio-${questions.id}`} checked={selectedAns[questions.id] === choice} onChange={() => handleClick(choice, questions.id)} disabled={answeredQuestions.has(questions.id)} />{choice}<br />
                                            </label>
                                        </div>
                                    ))}
                                </ul>
                            ))}
                            <div className='buttons'>
                                <Button variant="secondary" onClick={handlePrevious} disabled={currentPage === 1}>Previous</Button>{' '}
                                <span> {currentPage} </span>
                                <Button variant="secondary" onClick={handleNext} disabled={currentPage === totalPages}>Next</Button>{' '}
                                <Button variant="secondary" onClick={handleReset}>Reset</Button>{' '}
                                {currentPage === totalPages && (
                                    <>
                                        <Button variant="primary" onClick={handleSubmit}>Submit</Button>{' '}
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className='mainPage'>
                    <div className='centeredDiv'>
                        <h1>Play ReactJS Quiz!</h1>
                        <p>So, what are you waiting for? Click the "Start Quiz" button and get started!</p>
                        <Button variant="primary" onClick={handleStart} className='s'>Start the React Quiz &gt;</Button>{' '}<br /><br />
                        <p style={para}>
                            <span style={note}>NOTE:</span>
                            Click the 'Submit Test' button given at the bottom of this page to Submit your answers.<br />
                            The test will be submitted after time expires.<br />
                            Do not refresh the page.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Quiz;
