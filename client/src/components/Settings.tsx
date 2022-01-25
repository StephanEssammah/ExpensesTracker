import React from 'react';
import './Settings.scss';

interface Props {
  chartType: string,
  setChartType: React.Dispatch<React.SetStateAction<string>>
}

export const Settings: React.FC<Props> = ({chartType, setChartType}) => {
  return (
    <div className="settings"> 
      <h1 className="settings__heading">Settings</h1>
      <div className="settings__container">
        <p className="settings__container__title">Chart type:</p>
        <div className="options settings__container__buttons">
          <button 
            className={`settings__container__buttons__btn ${chartType === 'Line' ? 'settings__btn-active' : ''}`}
            onClick={() => setChartType('Line')}
          >
            Line
          </button>
          <button 
            className={`settings__container__buttons__btn ${chartType === 'Bar' ? 'settings__btn-active' : ''}`}
            onClick={() => setChartType('Bar')}
          >
            Bar
          </button>
        </div>
      </div>
    </div>
    )
};
