export class Cache {
  data: { [key: string]: any };
  constructor() {
    this.data = {};
  }

  set(name: string, value: any) {
    this.data[name] = value;
  }

  remove(name: string) {
    this.data[name] = null;
  }

  get(name: string) {
    return this.data[name];
  }
}
