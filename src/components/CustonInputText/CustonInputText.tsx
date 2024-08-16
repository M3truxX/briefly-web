import React, { useState, useRef, useEffect } from "react";
import { maskPhone, maskEmail } from "../../utils/masks";
import { CustomInputText } from "../../data/models/interfaces/CustomInputText";
import './custonInputText.scss';

const CustonInputText: React.FC<CustomInputText> = ({
    keyBoard = 'text', // Tipo de teclado
    estado, // Estado visual
    resetText, // Reseta o texto
    textPlaceholder, // Placeholder do input
    textdescription, // Descrição adicional
    showTextdescription, // Mostra a descrição
    type, // Tipo do input
    travelInfo, // Callback com input
    lengthMax, // Tamanho máximo
    mask, // Máscara usada
    color = 'black', // Cor do texto
    alignText = 'left', // Alinhamento do texto
    ...rest // Resto das props
}) => {

    const fadeAnim = useRef<number>(0); // Animação de fade
    const [text, setText] = useState(''); // Estado do texto
    const [animExecuted, setAnimExecuted] = useState(false); // Controle da animação

    useEffect(() => { 
        // Reseta texto e estado da animação ao mudar resetText
        setText(''); 
        setAnimExecuted(false); // Reseta o controle de animação
        fadeAnim.current = 0; // Reseta a animação
        travelInfo('')
    }, [resetText]);

    useEffect(() => { 
        // Ativa fadeIn ao mostrar descrição
        if (showTextdescription && !animExecuted) {
            fadeIn();
            setAnimExecuted(true);
        }
    }, [showTextdescription, animExecuted]);

    const fadeIn = () => { // Função para fade-in
        fadeAnim.current = 0;
        setTimeout(() => {
            fadeAnim.current = 1;
        }, 700);
    };

    function handleChange(inputText: string) { // Gerencia input com máscara
        let maskedText = inputText;
        if (mask === 'phone') {
            maskedText = maskPhone(inputText);
        } else if (mask === 'email') {
            maskedText = maskEmail(inputText);
        }
        setText(maskedText);
    }

    function tipoEstado(): string { // Define cor do estado
        switch (estado) {
            case 1:
                return 'red';
            case 2:
                return 'green';
            default:
                return 'gray';
        }
    }

    return ( // Renderização do componente
        <div>
            <div className={`section-style sombras border-${tipoEstado()}`}>
                <input
                    className='text-input-custon'
                    placeholder={textPlaceholder}
                    style={{ color, textAlign: alignText as any }}
                    type={type}
                    value={text}
                    onChange={(e) => {
                        handleChange(e.target.value);
                        travelInfo(e.target.value);
                    }}
                    maxLength={lengthMax}
                    {...rest}
                />
            </div>
            {showTextdescription && (
                <div className="fading-container" style={{ opacity: fadeAnim.current }}>
                    <span className="text-coment">{textdescription}</span>
                </div>
            )}
        </div>
    );
};

export default CustonInputText; // Exporta o componente
