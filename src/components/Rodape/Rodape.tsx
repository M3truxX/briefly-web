// Importa estilos globais e bibliotecas necessárias
import './rodape.scss';
import '../../utils/cssConf.scss';
import github from '../../img/github.png';

// Define o componente funcional Rodape
function Rodape() {
    return (
        <div className="rodape">
            <div className='Links-midea mbl-15'>
                {/* Primeiro conjunto de cartões */}
                <div className='card-base-midia'>
                    <img className='img-res-git' src={github} alt="Ícone de link" />
                    <div className='area-text-midea  mbl-10'>
                        <a className='rm-decoration fs-12 primary-text' href="https://github.com/sanisamoj/Briefly" target="blank">Sanisamoj</a>
                        <p className='fs-10 secundary-text'>back-end</p>
                    </div>
                </div>
                <div className='card-base-midia'>
                    <div className='area-text-midea mbl-10 '>
                        <a className='rm-decoration fs-12 primary-text' href="https://github.com/M3truxX/briefly-web" target="blank">M3truxX</a>
                        <p className='fs-10 secundary-text'>Web disigner</p>
                    </div>
                </div>
            </div>
            <div className='creditos pbl-10'>
                <p className='fs-12'>
                    © COPYRIGHT 2024 - BRIEFLY.
                </p>
                <p className='copyright fs-12'>
                    TODOS OS DIREITOS RESERVADOS.
                </p>
            </div>
        </div>
    )
}

export default Rodape;