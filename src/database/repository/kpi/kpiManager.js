class KPIManager {
    constructor() {
        this._kpiStrategy = null;
    }

    setKPIToManage(newStrategy) {
        this._kpiStrategy = newStrategy;
    }

    calculateKPI(petsList) {
        return this._kpiStrategy.calculateKPI(petsList);
    }
}

module.exports = KPIManager;