import "./graphInfo.css";
import React from 'react';
import { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip } from 'chart.js';
import Modal from "../Modal/Modal";
import { LinkDataResponse } from "../../data/models/interfaces/LinkDataResponse";
import { formatDate } from "../../utils/formatDate";
import { ClickerResponse } from "../../data/models/interfaces/ClickerResponse";
import '../../utils/cssConf.css'

Chart.register(ArcElement, Tooltip);

interface GraphInfoProps {
  receiveResponse: LinkDataResponse | null;
}

const GraphInfo: React.FC<GraphInfoProps> = ({ receiveResponse }) => {
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

  useEffect(() => {
    contDevice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiveResponse]);

  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="mt-2">
      <Modal isVisible={isModalVisible} onClose={closeModal}>
        {receiveResponse ? (
          <div>
            <p className="mb-5">Visitas Totais: {receiveResponse.totalVisits.length}</p>
            <ul className="mb-3">
              {receiveResponse.totalVisits.map((visit, index) => (
                <li className="xiuu mb-2 ml-2 mr-2" key={index}>
                  {visit.deviceInfo.deviceType} - {visit.region.city}, {visit.region.country} - {formatDate(visit.clickedAt)}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Modal>
      {receiveResponse ? (
        <div className="visit-container pt-2 pb-2 pl-5 pr-5">
          <p>Visitas Totais: {receiveResponse.totalVisits.length}</p>
          <div className="mt-1 graph-size">
            <Pie data={data} />
          </div>
          <button onClick={openModal} className="button-style-2 mt-1 fs-14 sombras">
            Mais detalhes
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default GraphInfo;