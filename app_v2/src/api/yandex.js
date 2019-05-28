/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
import axios from 'axios'
import fs from 'fs'
import keys from '../data/keys.json'

class YandexApi {

  constructor(config) {
    this.keys = keys.yandex;
    this.activeKey = null;

    this.fileName = null;
    this.fileDescriptor = config.fileDescriptor;
    this.city = config.city;
    this.request = config.request;

    this.onDataCallback = config.onData;

    this.setActiveKey();

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

  getNextActiveKeyIndex() {
    let index = 0;

    for (let i = 0; i < this.keys.length; i++) {
      let key = this.keys[i];
      if (key.empty === false) {
        index = i;
        break;
      }
    }

    return index;
  }

  setActiveKey() {
    let keyIndex = this.getNextActiveKeyIndex();
    this.activeKey = this.keys[keyIndex];
  }

  changeActiveKey() {
    this.keys[this.activeKey].empty = true;
    this.setActiveKey();
  }

  createFile() {

    if(fs.existsSync(this.fileName)) return;

    let data = `${this.fileHeader.join(';')}\n`;
    fs.writeFileSync(this.fileName, data, { 
      flag: 'wx',
      encoding: 'utf8' 
    });
  }

  setFileName() {
    this.fileName = `${this.request}-${this.fileDescriptor}.csv`;
  }

  async parse() {

    this.setFileName();
    this.createFile();

    return new Promise(async (resolve, reject) => {

      let step = 500;
      let count = 0;

      let skip = 0;

      let resultsCount;

      do {

        let response = await this.getContent({ skip });
        let items = response.data.features;

        if (!response.data || !response.data.features) {
          this.changeActiveKey();
          continue;
        }

        resultsCount = response.data.properties.ResponseMetaData.SearchResponse.found;

        items.forEach((item, index) => {
          this.processItem(item, index);
          count++;
        });

        skip += step;

        this.onDataCallback({ count, cityId: this.city.id });

        await this.noop();

      } while (resultsCount > count);

      resolve(this.city.name);

    });
  }

  async getContent(params) {
    return axios.get(`https://search-maps.yandex.ru/v1/?text=${encodeURIComponent(this.request)}&lang=ru_RU&ll=${this.city.geo}&spn=0.400,0.360&type=biz&results=500&skip=${params.skip}&apikey=${this.activeKey.key}`);
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
    // 3. Сообщения с сервера с количеством полученных результатов - для прогресса
    // 4. Фильтрация по ссылкам - чтобы были только нужные
    // 5. Разбить соощения по типам
    // 6. Автопереключение ключей апи

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

    let line = '';

    for (let i in entity) {
      line += `${entity[i]};`;
    }

    line += '\n';

    fs.appendFileSync(this.fileName, line, 'utf8');
  }

}

export default YandexApi;