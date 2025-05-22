let databaseInstance: any = null;

export function setDatabaseInstance(instance: any) {
    databaseInstance = instance;
}

export function getDatabaseInstance() {
    return databaseInstance;
}