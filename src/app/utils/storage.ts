class Storage {
    constructor(private storage) {
        this.storage = storage
    }
    get(key) {
        return this.storage.getItem(key)
    }
    set(key, value) {
        this.storage.setItem(key, value)
        return true
    }
    clear() {
        this.storage.clear()
    }
    remove(key) {
        this.storage.removeItem(key)
    }
}

export const sessionstorage = new Storage(window.sessionStorage);
export const localstorage = new Storage(window.localStorage);


