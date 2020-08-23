import NeDBLib from '../lib/nedb';

export default class BoxService {
    constructor() {
        this.db = new NeDBLib('boxes');
    }

    async getBoxes(sort = null) {
        console.log('getBoxes', sort);
        const querys = [{}];
        if (sort !== null) querys.push(sort);
        const boxes = await this.db.getAll(...querys);
        return boxes || [];
    }

    async getBox({ boxId }) {
        console.log('getBox', boxId);
        const box = await this.db.getOnce({ _id: boxId });
        return box || null;
    }

    async getBoxByTitle({ boxTitle }) {
        console.log('getBox', boxTitle);
        const box = await this.db.getOnce({ title: boxTitle });
        return box || null;
    }

    async createBox({ box }) {
        console.log('createBox', box);
        return await this.db.create(box);
    }

    async updateBox({ boxId, box }) {
        console.log('updateBox', boxId, box);
        return await this.db.update({ _id: boxId }, box);
    }

    async deleteBox({ boxId }) {
        console.log('deleteBox', boxId);
        return await this.db.delete({ _id: boxId });
    }
}
