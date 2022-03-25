import axios from "axios";

let date = new Date().toJSON().split("T")[0];
let time = new Date().toLocaleTimeString();

export const eruvakaThief = async () => {
  let accessToken = (
    await axios.post("https://user-api.pondlogs.com/1.0/signin", {
      email: "soportesistemas@corporacionlanec.com",
      password: "Lanec.2020",
      meta_data: {
        browser:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.83 Safari/537.36",
        client: "WEB",
      },
    })
  ).data.access_token;

  letsGetInformation(accessToken);
};

const letsGetInformation = async (accessToken) => {
  let config = {
    headers: {
      Authorization: accessToken,
    },
  };

  let idsList = (
    await axios.get(
      "https://user-api.pondlogs.com/1.0/ponds/active/summary?location_id=5f74ada32bc16040de09c66e&get_all=true",
      config
    )
  ).data.ponds;

  let oxygenAndTempList = (
    await axios.get(
      "https://user-api.pondlogs.com/1.0/ponds/do-temperature?location_id=5f74ada32bc16040de09c66e&exclude_previous_harvest_data=true",
      config
    )
  ).data.pond_water_quality_summary;

  let oxygenAndTempObject = [];

  idsList.forEach((elementId) => {
    oxygenAndTempList.forEach((element) => {
      if (element._id === elementId._id) {
        console.log(element.data);
        oxygenAndTempObject.push({
          serialDispositivo: "",
          timestamp: `${date} ${time}`,
          oxigenomgl: element.data[0].dissolved_oxygen,
          oxigenoPorcentaje: 0,
          temperatura: element.data[0].temperature,
          bateria: 0,
          nameHuman: elementId.title,
        });
      }
    });
  });
  postData({ datos: oxygenAndTempObject });
};

const postData = async (params) => {
  console.log(params);
  let accessToken = (
    await axios.post(
      "https://lanecmovil.com:8447/WebAPI/api/login/authenticate",
      {
        Username: "sistemas",
        Password: "Sistem@s64",
      }
    )
  ).data;

  let config = {
    headers: {
      Authorization: accessToken,
    },
  };

  console.log(accessToken);

  let prueba = await axios.post(
    "https://lanecmovil.com:8447/WebAPI/api/spc/js?prmUsuario=jespinoza&prmTipo=50000",
    params,
    config
  );

  console.log(prueba.data);
};
