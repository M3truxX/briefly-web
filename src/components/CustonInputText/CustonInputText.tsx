// Importa estilos globais e bibliotecas necessárias
import React, { useState, useEffect } from "react";
import { maskPhone, maskEmail } from "../../utils/masks";
import { CustomInputText } from "../../data/models/interfaces/CustomInputText";
import './custonInputText.scss';

// Componente de input personalizado
const CustonInputText: React.FC<CustomInputText> = ({
    keyBoard = 'text', // Tipo de teclado
    estado, // Estado visual do input
    resetText, // Reseta o texto do input
    textPlaceholder, // Placeholder do input
    textdescription, // Descrição adicional
    showTextdescription, // Controla a exibição da descrição
    type, // Tipo do input (ex: text, password)
    travelInfo, // Callback para o texto do input
    lengthMax, // Tamanho máximo do texto
    mask, // Máscara aplicada ao texto
    color = 'black', // Cor do texto
    alignText = 'left', // Alinhamento do texto
    onDateSelect, // Nova prop para lidar com a seleção de data
    ...rest // Outras props
}) => {

    const [text, setText] = useState(''); // Estado do texto no input
    const [opacity, setOpacity] = useState(0);
    const [animExecuted, setAnimExecuted] = useState(false); // Controle da animação de fade

    useEffect(() => {
        setText('');
        setAnimExecuted(false);
        travelInfo('');
    }, [resetText]);

    useEffect(() => {
        // Executa animação de fade se a descrição estiver visível
        if (showTextdescription && !animExecuted) {
            fadeIn();
            setAnimExecuted(true);
        }

        // Reinicia a animação de fade
        if (text === '' || !showTextdescription) {
            resetFadeIn();
        }
    }, [showTextdescription, animExecuted, text]);


    // Função para iniciar a animação de fade
    const fadeIn = () => {
        setOpacity(0);
        requestAnimationFrame(() => {
            setOpacity(1);
        });
    };

    const resetFadeIn = () => {
        setOpacity(0);
        setAnimExecuted(false);
    };

    // Manipula mudanças no texto, aplicando máscara se necessário
    function handleChange(inputText: string) {
        let maskedText = inputText;
        if (mask === 'phone') {
            maskedText = maskPhone(inputText);
        } else if (mask === 'email') {
            maskedText = maskEmail(inputText);
        }
        setText(maskedText);
        travelInfo(maskedText);
    }

    // Define a classe de estado visual com base no valor de `estado`
    function tipoEstado(): string {
        switch (estado) {
            case 1:
                return 'red';
            case 2:
                return 'green';
            default:
                return 'gray';
        }
    }

    // Função para lidar com a mudança de data
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = event.target.value;
        setText(selectedDate);
        travelInfo(selectedDate);

        // Chama a função de validação, se fornecida
        if (onDateSelect) {
            onDateSelect(selectedDate);
        }
    };

    return (
        <div>
            <div className={`section-style sombras border-${tipoEstado()}`}>
                <input
                    className='text-input-custon'
                    placeholder={textPlaceholder}
                    style={{ color, textAlign: alignText as any }}
                    type={type}
                    value={text}
                    onChange={type === 'date' ? handleDateChange : (e) => handleChange(e.target.value)}
                    maxLength={lengthMax}
                    max="9999-12-31"
                    {...rest} // Propagação de outras propriedades
                />
            </div>
            {showTextdescription && (
                <div className="fading-container" style={{ opacity: opacity, transition: 'opacity 0.7s ease-in-out' }}>
                    <span className="text-coment">{textdescription}</span>
                </div>
            )}
        </div>
    );
};

export default CustonInputText;