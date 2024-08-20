// Importa estilos globais e bibliotecas necessárias
import React, { useState, useRef, useEffect } from "react";
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
    ...rest // Outras props
}) => {

    const fadeAnim = useRef<number>(0); // Referência para animação de fade
    const [text, setText] = useState(''); // Estado do texto no input
    const [animExecuted, setAnimExecuted] = useState(false); // Controle da animação de fade
    const travelInfoRef = useRef(travelInfo); // Ref para armazenar a função travelInfo
    

    useEffect(() => {
        setText('');
        setAnimExecuted(false);
        fadeAnim.current = 0;
        travelInfoRef.current(''); // Usa a função armazenada na ref
    }, [resetText]);

    useEffect(() => {
        // Executa animação de fade se a descrição estiver visível
        if (showTextdescription && !animExecuted) {
            fadeIn();
            setAnimExecuted(true);
        }
    }, [showTextdescription, animExecuted]);

    // Função para iniciar a animação de fade
    const fadeIn = () => {
        fadeAnim.current = 0;
        setTimeout(() => {
            fadeAnim.current = 1;
        }, 700);
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
    }

    // Define a classe de estado visual com base no valor de `estado`
    function tipoEstado(): string {
        switch (estado) {
            case 1:
                return 'red'; // Estado com erro
            case 2:
                return 'green'; // Estado válido
            default:
                return 'gray'; // Estado neutro
        }
    }

    return (
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
                        travelInfo(e.target.value); // Passa o valor para o callback
                    }}
                    maxLength={lengthMax}
                    {...rest} // Propagação de outras propriedades
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

export default CustonInputText;