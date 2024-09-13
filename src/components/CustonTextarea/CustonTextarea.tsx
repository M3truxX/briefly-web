// Importa estilos globais e bibliotecas necessárias
import React, { useState, useEffect } from "react";
import { CustomInputText } from "../../data/models/interfaces/CustomInputText";
import './CustonTextarea.scss';
import '../../utils/cssConf.scss'

// Componente de input personalizado
const CustonTextarea: React.FC<CustomInputText> = ({
    estado, // Estado visual do input
    resetText, // Reseta o texto do input
    textPlaceholder, // Placeholder do input
    textdescription, // Descrição adicional
    showTextdescription, // Controla a exibição da descrição
    travelInfo, // Callback para o texto do input
    color = 'black', // Cor do texto
    alignText = 'left', // Alinhamento do texto
    lengthMax, // Tamanho máximo do texto
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

    return (
        <div className="textArea-container">
            <div className={`section-style-textArea sombras border-${tipoEstado()}`}>

                <textarea
                    className='text-textArea'
                    placeholder={textPlaceholder}
                    value={text}
                    style={{ color, textAlign: alignText as any }}
                    onChange={(e) => handleChange(e.target.value)}
                    maxLength={lengthMax}
                    {...rest} // Propagação de outras propriedades
                />
            </div>
            {showTextdescription && (
                <div className="fading-container-textArea mb-10" style={{ opacity: opacity, transition: 'opacity 0.7s ease-in-out' }}>
                    <span className="text-coment-textArea">{textdescription}</span>
                </div>
            )}
        </div>
    );
};

export default CustonTextarea;