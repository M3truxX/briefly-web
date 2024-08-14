import './funcLink.css';
import link from '../../img/link.png';
import qrcode from '../../img/qrcode.png';
import balance from '../../img/balance.png';
import time from '../../img/time.png';

function CardFunc() {
  return (
    <div className='funcLink-container'>
      <h1 className='mb-20 primary-text '>Funcionalidades</h1>
      <div className='container-card'>
        <div className='card-base'>
          <img className='img-res' src={link} alt="Ícone de link" />
          <div className='area-text mt-10 mb-10 font-bold'>
            <p className='primary-text mb-10 fs-16'>Encurtar links</p>
            <p className='fs-10 secundary-text'>Deixando seu link menor, facilita o compartilhamento</p>
          </div>
        </div>
        <div className='card-base'>
          <img className='img-res' src={qrcode} alt="Ícone de QR code" />
          <div className='area-text mt-10 mb-10 font-bold'>
            <p className='primary-text mb-10 fs-16'>Qr code</p>
            <p className='fs-10 secundary-text'>Facilita o compartilhamento de links gerados!</p>
          </div>
        </div>
      </div>
      <div className='container-card'>
        <div className='card-base'>
          <img className='img-res' src={balance} alt="Ícone de análise" />
          <div className='area-text mt-10 mb-10 font-bold'>
            <p className='primary-text mb-10 fs-16'>Análise de dados</p>
            <p className='fs-10 secundary-text'>Melhor controle/gerenciamento dos links da sua empresa.</p>
          </div>
        </div>
        <div className='card-base'>
          <img className='img-res' src={time} alt="Ícone de tempo" />
          <div className='area-text mt-10 mb-10 font-bold'>
            <p className='primary-text mb-10 fs-16'>Tempo de validade</p>
            <p className='fs-10 secundary-text'>Nosso serviço mantém ativos os links por 1 ano!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardFunc;