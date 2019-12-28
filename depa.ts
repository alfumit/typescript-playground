export abstract class Dept {
    private static _id: number = 0;

    static assignId(): number {
        this._id++;
        return this._id;
    }
}

