
export interface StoreEntity {
    name: string;
    age?: number;
}

export class Store {
    // private name: string;
    private _name: string = "";
    private _age?: number;
    
    constructor(entity: StoreEntity) {
        this._name = entity.name
        this._age = entity.age;
    }

    get name() { return this._name; }
    get age() { return this._age; }
    

    get create() {
        return {
            name : this._name,
            age: this._age 
        }
    }

}