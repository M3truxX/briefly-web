import React, { useState, useRef, useEffect, useCallback } from "react";
import './inputCode.scss';

interface InputCodeProps {
    quantidade: number;
    onInputChange: (values: string[]) => void;
}

const InputCode: React.FC<InputCodeProps> = ({ quantidade, onInputChange }) => {
    const [inputValues, setInputValues] = useState<string[]>(Array(quantidade).fill(''));
    const textInputRefs = useRef<(HTMLInputElement | null)[]>(Array(quantidade).fill(null));

    useEffect(() => {
        onInputChange(inputValues);
    }, [inputValues, onInputChange]);

    const sanitizeText = useCallback((text: string) => text.replace(/[^a-zA-Z0-9]/g, ''), []);

    const updateInputValues = useCallback((index: number, newValue: string) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = newValue;
        setInputValues(newInputValues);
    }, [inputValues]);

    const handleTextChange = useCallback((text: string, index: number) => {
        const sanitizedText = sanitizeText(text);
        updateInputValues(index, sanitizedText);

        if (sanitizedText && index < quantidade - 1) {
            textInputRefs.current[index + 1]?.focus();
        }
    }, [sanitizeText, updateInputValues, quantidade]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !inputValues[index] && index > 0) {
            textInputRefs.current[index - 1]?.focus();
        }
    }, [inputValues]);

    return (
        <div className="container-code">
            {inputValues.map((_, index) => (
                <div key={index} className="section-style-code">
                    <input
                        type="text"
                        className="input-field-code"
                        value={inputValues[index]}
                        maxLength={1}
                        onChange={(e) => handleTextChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(input) => (textInputRefs.current[index] = input)}
                    />
                </div>
            ))}
        </div>
    );
};

export default InputCode;