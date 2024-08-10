import './funcLink.css';
import link from '../../img/link.png';
import qrcode from '../../img/qrcode.png';
import balance from '../../img/balance.png';
import time from '../../img/time.png';

function CardFunc() {
  return (
    <div>
      <h1 className='fs-30 mb-2 primary-text '>Funcionalidades</h1>
      <div className='container-cards'>
        <div className='container-card'>
          <div className='card-base'>
            <img className='img-res' src={link} alt="Ícone de link" />
            <div className='area-text mt-1 mb-1'>
              <h1 className='primary-text mb-1 fs-16'>Encurtar links</h1>
              <h3 className='fs-10 secundary-text'>Deixando seu link menor, facilita o compartilhamento</h3>
            </div>
          </div>
          <div className='card-base'>
            <img className='img-res' src={qrcode} alt="Ícone de QR code" />
            <div className='area-text mt-1 mb-1'>
              <h1 className='primary-text mb-1 fs-16'>Qr code</h1>
              <h3 className='fs-10 secundary-text'>Facilita o compartilhamento de links gerados!</h3>
            </div>
          </div>
        </div>
        <div className='container-card'>
          <div className='card-base'>
            <img className='img-res' src={balance} alt="Ícone de análise" />
            <div className='area-text mt-1 mb-1'>
              <h1 className='primary-text mb-1 fs-16'>Análise de dados</h1>
              <h3 className='fs-10 secundary-text'>Melhor controle/gerenciamento dos links da sua empresa.</h3>
            </div>
          </div>
          <div className='card-base'>
            <img className='img-res' src={time} alt="Ícone de tempo" />
            <div className='area-text mt-1 mb-1'>
              <h1 className='primary-text mb-1 fs-16'>Tempo de validade</h1>
              <h3 className='fs-10 secundary-text'>Nosso serviço mantém ativos os links por 1 ano!</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardFunc;