// Importa estilos e bibliotecas necessárias
import "./graphInfo.scss";
import '../../utils/cssConf.scss'
import React from 'react';
import { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip } from 'chart.js';
import Modal from "../Modal/Modal";
import CustonButtom from "../CustomButtom/CustonButtom";
import { formatDate } from "../../utils/formatDate";
import { LinkDataResponse } from "../../data/models/interfaces/LinkDataResponse";
import { ClickerResponse } from "../../data/models/interfaces/ClickerResponse";

// Registra elementos do gráfico
Chart.register(ArcElement, Tooltip);

// Tipos de propriedades aceitas pelo componente
interface GraphInfoProps {
  receiveResponse: LinkDataResponse | null;
}

// Componente para exibir gráfico de visitas
const GraphInfo: React.FC<GraphInfoProps> = ({ receiveResponse }) => {
  // Estado de visibilidade do modal
  const [isModalVisible, setModalVisible] = useState(false);

  // Estado inicial dos dados do gráfico
  const [data, setData] = useState({
    labels: ['Desktop', 'Mobile'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB']
      }
    ]
  });

  // Conta tipos de dispositivos e atualiza o gráfico
  const contDevice = () => {
    const countDeviceTypes = (visits: ClickerResponse[]): { desktop: number; mobile: number } => {
      return visits.reduce((count, visit) => {
        const deviceType = visit.deviceInfo.deviceType;
        if (deviceType === 'desktop') {
          count.desktop += 1;
        } else if (deviceType === 'mobile') {
          count.mobile += 1;
        }
        return count;
      }, { desktop: 0, mobile: 0 });
    };

    if (receiveResponse && receiveResponse.totalVisits) {
      const deviceCounts = countDeviceTypes(receiveResponse.totalVisits);
      setData(prevData => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: [deviceCounts.desktop, deviceCounts.mobile]
          }
        ]
      }));
    }
  };

  // Atualiza o gráfico quando os dados mudam
  useEffect(() => {
    contDevice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiveResponse]);

  // Abre o modal
  const openModal = () => {
    setModalVisible(true);
  };

  // Fecha o modal
  const closeModal = () => {
    setModalVisible(false);
  };

  // Estados para a paginação no modal
  const [currentPageModal, setCurrentPageModal] = useState(1);
  const itemsPerPage = 6;

  // Função para calcular as visitas a serem exibidas na página atual do modal
  const getCurrentVisits = () => {
    if (!receiveResponse) return [];
    const startIndex = (currentPageModal - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return receiveResponse.totalVisits.slice(startIndex, endIndex);
  };

  // Funções de navegação do paginador
  const handleNextPageModal = () => {
    if (receiveResponse && currentPageModal < Math.ceil((receiveResponse.totalVisits.length || 0) / itemsPerPage)) {
      setCurrentPageModal(prev => prev + 1);
    }
  };

  const handlePreviousPageModal = () => {
    if (currentPageModal > 1) {
      setCurrentPageModal(prev => prev - 1);
    }
  };

  // Função para resetar a página do modal quando o receiveResponse mudar
  useEffect(() => {
    setCurrentPageModal(1);
  }, [receiveResponse]);

  // Adicione esta constante com as opções do gráfico
  const options = {
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div>
      <Modal isVisible={isModalVisible} onClose={closeModal}>
        {receiveResponse ? (
          <div>
            <p className="mb-40 color-primary font-bold">Visitas Totais: {receiveResponse.totalVisits.length}</p>
            <ul className="mb-30">
              {getCurrentVisits().map((visit, index) => (
                <li className="list-remove mb-15 mi-20" key={index}>
                  {visit.deviceInfo.deviceType} - {visit.region.city}, {visit.region.country} - {formatDate(visit.clickedAt)}
                </li>
              ))}
            </ul>
            {/* Paginador */}
            <div className="paginator-modal">
              <CustonButtom
                text="Anterior"
                activate={currentPageModal > 1}
                onClick={handlePreviousPageModal}
                btnHeight={35}
                btnWidth={90}
              />
              <span className="paginator-info mi-10">
                Página {currentPageModal} de {Math.ceil((receiveResponse.totalVisits.length || 0) / itemsPerPage)}
              </span>
              <CustonButtom
                text="Próxima"
                activate={currentPageModal < Math.ceil((receiveResponse.totalVisits.length || 0) / itemsPerPage)}
                onClick={handleNextPageModal}
                btnHeight={35}
                btnWidth={90}
              />
            </div>
          </div>
        ) : (
          <p>Carregando informações...</p>
        )}
      </Modal>
      {receiveResponse ? (
        <div className="visit-container pbl-20 pi-50">
          <p className="color-dark font-bold">Visitas Totais: {receiveResponse.totalVisits.length}</p>
          <div className="mt-10 graph-size">
            <Pie data={data} options={options} />
          </div>
          <span className="mt-10"><CustonButtom text="Detalhes" onClick={openModal} /></span>
        </div>
      ) : null}
    </div>
  );
};

export default GraphInfo;