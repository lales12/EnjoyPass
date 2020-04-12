interface IConfig {
    contractAddress: string;
    disease: string;
    provider: string;
    socketServer: string;
}

export const config: IConfig = {
    contractAddress: "0x9d89E1f48272F5cEDC3751629E0fE690D7709782",
    disease: "0",
    provider: "https://ropsten.infura.io/v3/19b835e7a5fa40e6abfbf6398cd31a8f",
    socketServer: "http://app.enjoypass.es:3000",
};
