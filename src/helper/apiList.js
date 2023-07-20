export const apiList = {
    getProducts: { method: "GET", url: (pageSize, skip, product, category) => `/products?pageSize=${pageSize}&skip=${skip}&product=${product}&category=${category}` },
    adminLogin: { method: "POST", url: '/admin/login' },
    adminSignup: { method: "POST", url: '/admin/signup' },
    income: { method: "POST", url: "income/add" },

}

export const Rough = {
    getRough: { method: "GET", url: (skip, limit) => `/rough/view?skip=${skip}&limit=${limit}` },

    addRough: { method: "POST", url: "/rough/create" },
    deleteRough: { method: "POST", url: (id) => `/delete/mainrough?id=${id}` },
    editRough: { method: "PUT", url: (id) => `/edit/mainrough?id=${id}` },
    getRoughPrefrence: { method: "GET", url: "/common/getList" },
    getSortingData: { method: "GET", url: "/rough/sorting/view" },
    addSortingData: { method: "POST", url: "/rough/sorting/create" },
    getPolishRough: { method: "GET", url: "/rough/getpolished" }
};

export const Office = {
    assignOffice: { method: "POST", url: "/office/create" },
    getOffice: { method: "GET", url: "/office/view" },
    getSubOffice: { method: "GET", url: "/office/subpacket/view" },
    getOfficeSr: { method: "GET", url: "/common/getOfficeSrNo" },
    createOfficePacket: { method: "POST", url: "/office/create/packet" },
    returnOfficePacket: { method: "POST", url: "/office/return" },
    unusedList: { method: "GET", url: "/common/unused" },
    // getRough: { method: "GET", url: "/rough/view" },
    // getRoughPrefrence: { method: "GET", url: "/common/getList" },
    // getSortingData: { method: "GET", url: "/rough/sorting/view" },
    // addSortingData: { method: "POST", url: "/rough/sorting/create" },
    deleteOfficeRough: { method: "POST", url: "/delete/officerough" },
    deleteOfficeSubPacket: { method: "POST", url: "/delete/officerough/subpacket" },
    editOfficeSubPacket: { method: "POST", url: "/edit/office/officesubpacket" }
};

// export const addQueryID = (url, id) => `${url}/${id}`;

export const Factory = {
    assignFactory: { method: "POST", url: "/factory/create" },
    getFactoryList: { method: "GET", url: "/factory/view" },
    getSubFactory: { method: "GET", url: "/factory/subpacket/view" },
    getFactorySr: { method: "GET", url: "/common/getfactorySrNo" },
    createFactoryPacket: { method: "POST", url: "/factory/create/packet" },
    returnFactoryPacket: { method: "POST", url: "/factory/return" },
    returnFactorySubPacket: { method: "POST", url: "/factory/subpacket/return" },
    unusedList: { method: "GET", url: "/common/unused" },

    getPacketNo: { method: "GET", url: "/factory/getpacketno" },
    getProecesswise: { method: "GET", url: "/factory/checkDifference" },

    deleteFactoryRough: { method: "POST", url: "/delete/factoryrough" },


    getPolishedReport: { method: "GET", url: "/factory/getPolishReportData" }
}


export const Employee = {
    addEmployee: { method: "POST", url: "/employee/add" },
    getEmployeeList: { method: "GET", url: "/employee/list" },
    updateEmployee: { method: "PUT", url: "/employee/update" },
    deleteEmployee: { method: "DELETE", url: "/employee/delete" },
    getEmployeeById: { method: "GET", url: "/employee/byid" }

}


export const Common = {
    addNewEmployeeType: { method: "POST", url: "/common/addEmployeetype" },
    getEmployeeType: { method: "GET", url: "/common/getEmployeeType" },
    addNewPurityType: { method: "POST", url: "/common/addPuritytype" },
    getPurityType: { method: "GET", url: "/common/getPurityType" },

    addNewFactoryProcess: { method: "POST", url: "/common/addfactoryProcessType" },
    getFactoryProcessList: { method: "GET", url: "/common/getfactoryProcessType" },

}