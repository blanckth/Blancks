const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class RegisterService {
  constructor(datafile) {
    this.datafile = datafile;
  }

  async getList() {
    const data = await this.getData();
    return data;
  }

  async addEntry(firstName, lastName, sex, birthDay, userName, password, email) {
    const data = (await this.getData()) || [];
    data.unshift({ firstName, lastName, sex, birthDay, userName, password, email });
    return writeFile(this.datafile, JSON.stringify(data));
  }

  async getData() {
    const data = await readFile(this.datafile, 'utf8');
    if (!data) return [];
    return JSON.parse(data);
  }
}
module.exports = RegisterService;