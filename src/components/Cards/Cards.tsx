// Importa o estilo globail e imagens necessárias
import './cards.scss';
import link from '../../img/link.png';
import qrcode from '../../img/qrcode.png';
import balance from '../../img/balance.png';
import time from '../../img/time.png';

function CardFunc() {
  return (
    <div className='funcLink-container'>
      <h1 className='mb-20 color-primary '>Funcionalidades</h1> {/* Título do componente */}
      <div className='container-card'>
        {/* Primeiro conjunto de cartões */}
        <div className='card-base'>
          <img className='img-res' src={link} alt="Ícone de link" /> {/* Ícone de link */}
          <div className='area-text mbl-10'>
            <p className='color-dark mb-10 fs-14 font-bold'>Encurtar links</p> {/* Título do cartão */}
            <p className='fs-11 color-secondary'>Deixando seu link menor, facilita o compartilhamento</p> {/* Descrição do cartão */}
          </div>
        </div>
        <div className='card-base'>
          <img className='img-res' src={qrcode} alt="Ícone de QR code" /> {/* Ícone de QR code */}
          <div className='area-text mbl-10'>
            <p className='color-dark mb-10 fs-14 font-bold'>Qr code</p> {/* Título do cartão */}
            <p className='fs-11 color-secondary'>Facilita o acesso de links gerados!</p> {/* Descrição do cartão */}
          </div>
        </div>
      </div>
      <div className='container-card'>
        {/* Segundo conjunto de cartões */}
        <div className='card-base'>
          <img className='img-res' src={balance} alt="Ícone de análise" /> {/* Ícone de análise */}
          <div className='area-text mbl-10'>
            <p className='color-dark mb-10 fs-14 font-bold'>Análise de dados</p> {/* Título do cartão */}
            <p className='fs-11 color-secondary'>Melhor controle/gerenciamento dos links da sua empresa</p> {/* Descrição do cartão */}
          </div>
        </div>
        <div className='card-base'>
          <img className='img-res' src={time} alt="Ícone de tempo" /> {/* Ícone de tempo */}
          <div className='area-text mbl-10'>
            <p className='color-dark mb-10 fs-14 font-bold'>Tempo de validade</p> {/* Título do cartão */}
            <p className='fs-11 color-secondary'>Nosso serviço mantém ativos os links por 2 anos!</p> {/* Descrição do cartão */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardFunc;