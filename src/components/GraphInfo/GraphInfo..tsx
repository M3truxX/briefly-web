import "./graphInfo.scss";
import React from 'react';
import { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip } from 'chart.js';
import Modal from "../Modal/Modal";
import { LinkDataResponse } from "../../data/models/interfaces/LinkDataResponse";
import { formatDate } from "../../utils/formatDate";
import { ClickerResponse } from "../../data/models/interfaces/ClickerResponse";
import '../../utils/cssConf.scss'
import CustonButtom from "../CustomButtom/CustonButtom";

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
    <div className="mt-20">
      <Modal isVisible={isModalVisible} onClose={closeModal}>
        {receiveResponse ? (
          <div className={` ${receiveResponse ? 'visible' : ''}`}>
            <p className="mb-40 primary-text font-bold">Visitas Totais: {receiveResponse.totalVisits.length}</p>
            <ul className="mb-30">
              {receiveResponse.totalVisits.map((visit, index) => (
                <li className="list-remove mb-15 ml-20 mr-20" key={index}>
                  {visit.deviceInfo.deviceType} - {visit.region.city}, {visit.region.country} - {formatDate(visit.clickedAt)}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Modal>
      {receiveResponse ? (
        <div className="visit-container pt-20 pb-20 pl-50 pr-50">
          <p className="primary-text font-bold">Visitas Totais: {receiveResponse.totalVisits.length}</p>
          <div className="mt-10 graph-size">
            <Pie data={data} />
          </div>
          <span className="mt-10"><CustonButtom text="Detalhes" onClick={openModal} /></span>
        </div>
      ) : null}
    </div>
  );
};

export default GraphInfo;