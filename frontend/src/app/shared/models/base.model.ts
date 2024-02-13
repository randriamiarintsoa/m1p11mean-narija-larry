import { jsonIgnoreReplacer, jsonIgnore } from 'json-ignore';

export interface BaseModelInterface {
  _id: string;
  createdAt: string;
  updatedAt: string;
  map(data: any);
}

export abstract class BaseModel {
  _id!: string;
  @jsonIgnore()
  version!: string;
 /* @jsonIgnore()
  createdAt!: string;*/
  @jsonIgnore()
  updatedAt!: string;
  @jsonIgnore()
  deleted!: boolean;

  constructor(arg?: any) {
    if (arg) {
      for (const key in arg) {
        if (Object.prototype.hasOwnProperty.call(arg, key)) {
          this[key] = arg[key];
        }
      }
    }
  }

  map(data: any) {
    if (data) {
        const keys = Object.keys(this);
        for (const i in keys) {
            if (i) {
                const property = keys[i];
                if (typeof this[property] !== 'function' && !(this[property] instanceof Array)) {
                    if (typeof this[property] === 'object' && data[property] !== 'null' && data[property] !== 'undefined') {
                        this[property].id = data[property];
                    } else if (data.hasOwnProperty(property)) {
                        if (typeof this[property] === 'boolean') {
                            this[property] = (data[property] === true); // === 1 !why?
                        } else {
                            if (typeof this[property] === 'number' && typeof data[property] === 'string') {
                                const temp: string = data[property];
                                this[property] = parseFloat(temp.replace(',', '.'));
                            } else {
                                this[property] = data[property];
                            }
                        }
                    }
                }
            }
        }
    }
    return this;
  }

  hasID() {
      return (this._id !== '' && this._id !== null);
  }


}
