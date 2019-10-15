/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
import axios from 'axios'
import fs from 'fs'
import querystring from 'querystring'
import errorResponseParser from '../helpers/yandexErrorResponseParser'

class YandexApi {

  constructor(config) {

    this.onDataCallback  = config.onData;
    this.onErrorCallback = config.onError;

    this.keysManager = config.keysManager;

    this.fileName = null;
    this.city = null;
    this.cityIndex = null;
    this.request = null;
    this.enablePartition = null;

    this.fileHeader = [
      'Город',
      'Название',
      'Адрес',
      'Сайт',
      'Телефон 1',
      'Телефон 2',
      'Телефон 3',
      'Телефон 4',
      'VK',
      'INST',
      'FB',
      'OK'
    ];

  }

  load(data) {

    this.fileName = data.fileName + '.csv';
    this.city = data.city;
    this.request = data.request;
    this.enablePartition = data.enablePartition;

  }

  createFile() {
    let data = `${this.fileHeader.join(';')}\n`;
    fs.writeFileSync(this.fileName, data, { 
      flag: 'wx',
      encoding: 'utf8' 
    });
  }

  async parse() {

    if(fs.existsSync(this.fileName) === false) {
      this.createFile();
    }    

    if (this.enablePartition) {
      this.appendEmptyLine();
      this.appendCityLine();
    }

    return new Promise(async (resolve, reject) => {

      let step = 500;
      let count = 0;

      let skip = 0;

      let resultsCount;

      do {

        let response;

        try {
          response = await this.getContent({ skip });
        } catch(e) {
          let error = errorResponseParser(e, this);
          this.onErrorCallback(error);
          this.keysManager.changeActiveKey();
          continue;
        }

        let items = response.data.features;

        if (!response.data || !response.data.features) {
          continue;
        }

        resultsCount = response.data.properties.ResponseMetaData.SearchResponse.found;

        items.forEach((item, index) => {
          this.processItem(item, index);
          count++;
        });

        skip += step;

        this.onDataCallback({type: 'city-process', data: { 
          count, 
          city: this.city, 
          items 
        }});

        await this.noop();

      } while (resultsCount > count);

      resolve({
        result: 'success', 
        type: 'city-end', 
        data: { count, city: this.city }
      });

    });
  }

  async getContent(params) {
    let qs = querystring.stringify({
      text:    this.request,
      lang:    'ru_RU',
      ll:      this.city.geo,
      spn:     '0.400,0.360',
      type:    'biz',
      results: 500,
      skip:    params.skip,
      apikey:  this.keysManager.getActiveKey()
    });

    return axios.get(`https://search-maps.yandex.ru/v1/?${qs}`);
  }

  async noop() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, 5000);
    });
  }

  processItem(item, index) {

    let props = item.properties.CompanyMetaData;
    let entity = {
      city: this.city.name,
      name: props.name,
      address: props.address ? props.address : '',
      url: props.url ? props.url : 'нет сайта',
      phone1: '',
      phone2: '',
      phone3: '',
      phone4: '',
      link1: '',
      link2: '',
      link3: '',
      link4: ''
    };


    // TO DO - 
    // 4. Фильтрация по ссылкам - чтобы были только нужные
    // 5. Разбить соощения по типам

    if (props.Links && props.Links.length > 0) {
      props.Links.forEach((link, index) => {
        if (link.href.indexOf('vk.com') !== -1) {
          entity.link1 = link.href
        }
        else if (link.href.indexOf('instagram.com') !== -1) {
          entity.link2 = link.href
        }
        else if (link.href.indexOf('ok.ru') !== -1) {
          entity.link4 = link.href
        }
        else if (link.href.indexOf('facebook.com') !== -1) {
          entity.link3 = link.href
        }
      });
    }

    if (props.Phones && props.Phones.length > 0) {
      props.Phones.forEach((phone, index) => {
        if (index > 3) return;
        entity[`phone${index + 1}`] = phone.formatted;
      });
    }

    this.appendLine(entity);
  }

  /** 
   * Appends empty line with city name into CSV table
  */
  appendCityLine() {
    let entity = this.getEmptyEntity();
    entity.city = this.city.name;
    this.appendLine(entity);
  }

  appendEmptyLine() {
    this.appendLine(this.getEmptyEntity());
  }

  getEmptyEntity() {
    return {
      city: '',
      name: '',
      address: '',
      url: '',
      phone1: '',
      phone2: '',
      phone3: '',
      phone4: '',
      link1: '',
      link2: '',
      link3: '',
      link4: ''
    }
  }

  /** 
   * @param { object } entity
   * Appends line into CSV table
  */
  appendLine(entity) {
    let line = '';
  
    for (let i in entity) {
      line += `${entity[i]};`;
    }

    line += '\n';

    fs.appendFileSync(this.fileName, line, 'utf8');
  }

}

export default YandexApi;