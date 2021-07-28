import { v4 as uuidV4 } from 'uuid';

const CONTACTS = 'CONTACTS'

export function createContact ({ id, bossId, name, phone, workersId }) {
    return {
        id: id || uuidV4(),
        bossId: bossId || null,
        name: name || `Unknown name ${this.id}`,
        phone: phone || null,
        workersId: workersId || [],
    }
}

const defaultContacts = [
    createContact({
        id: 1,
        name: 'Lena',
        phone: '+7 995 227-99-82',
    }),
    createContact({
        id: 2,
        name: 'Alexei',
        phone: '+7 964 825-69-48',
        workersId: [3],
    }),
    createContact({
        id: 3,
        bossId: 2,
        name: 'Roma',
        phone: '+7 935 462-15-89',
    })
]

// Take contacts from localStorage
export function initState() {
    try {
        return JSON.parse(localStorage.getItem(CONTACTS)) || defaultContacts
    } catch (e) {
        console.error(e)
        return defaultContacts
    }
}

// Save contacts into localStorage
export function saveStorage(payload) {
    try {
        localStorage.setItem(CONTACTS, JSON.stringify(payload))
    } catch (e) {
        throw e
    }
}