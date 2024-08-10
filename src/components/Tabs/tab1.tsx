import React, { ChangeEvent, useState } from 'react';
import { LinkDataRequest } from '../../data/models/interfaces/LinkDataRequest';
import { LinkDataResponse } from '../../data/models/interfaces/LinkDataResponse';
import { DatabaseRepository } from '../../data/models/class/DatabaseRepository';
import { DefaultRepository } from '../../data/repository/DefaultRepository';
import { ApiService } from '../../api/ApiService';
import { Config } from '../../Config';

const Tab1Content: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const [receiveResponse, setReceiveResponse] = useState<LinkDataResponse | null>(null);
  const apiService: ApiService = new ApiService(Config.BASE_URL)
  const database: DatabaseRepository = new DefaultRepository(apiService)

  async function generatorShortLink() {
    const linkDataRequest: LinkDataRequest = {
      link: 'inputValue',
      personalizedCode: null,
      password: null,
      expiresIn: null
    }

    const linkDataResponse: LinkDataResponse = await database.generateLinkData(linkDataRequest)
    console.log(linkDataResponse)
    setReceiveResponse(linkDataResponse)
  }

  return (
    <div>
      <h1 className="primary-text">Insira o link para encurtá-lo!</h1>
      <form className="mt-1" onSubmit={(e) => e.preventDefault()}>
        <input className="input-text p-1"
          type="text"
          id="input"
          value={inputValue}
          onChange={handleChange}
          placeholder="Cole seu texto aqui"
        />
        <button className="button-style mt-1 ml-1 mr-14 fs-14 sombras" onClick={generatorShortLink} type="submit">Encurtar</button>
      </form>
    </div>
  )
};

export default Tab1Content;