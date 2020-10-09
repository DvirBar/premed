import React from 'react';
import Section from '../common/Section';

function QuestionItem({ question }) {

    return (
        <Section className="question-item">
            <Section.Title className="question-title">
                <span>{question.question}</span>
            </Section.Title>
            <Section.Body className="question-content">
                <p className="question-answer">
                    {question.answer}
                </p>
                {question.source_link &&
                    <a 
                    className="question-source"
                    href={question.source_link}
                    target="_blank"
                    rel="noopener norefrrer">
                        צפייה במקור
                    </a>                    
                }
            </Section.Body>
        </Section>
    )
}

export default QuestionItem
