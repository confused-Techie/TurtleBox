const axios = require("axios");
const { inspect } = require("node:util");

let STAFF_LIST = undefined;

async function getList() {
  if (!turtle.config.plugins.powerschool) {
    return '';
    // config doesn't exist as a setting.
  }

  let configuration = turtle.config.plugins.powerschool;

  let credentials = (new Buffer(`${configuration.id}:${configuration.secret}`)).toString("base64");
  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  let access_token = undefined;

  try {
    let resp = await axios.post(`${configuration.url}/oauth/access_token`, urlencoded, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Authorization": `Basic ${credentials}`
      }
    });

    access_token = resp.data.access_token;

  } catch(err) {
    console.log(err);
  }

  let districtArray = [];

  //for await (let i = 0; i < configuration.schoolArray; i++) {
  for await (const schoolID of configuration.schoolArray) {
    let i = configuration.schoolArray.indexOf(schoolID);
    let schoolName = (typeof configuration.namedSchoolArray[i] === "string") ?
      configuration.namedSchoolArray[i] : configuration.schoolArray[i];

    let staffCount, staffDetails;

    try {
      staffCount = await axios({
        method: "get",
        url: `${configuration.url}/ws/v1/school/${configuration.schoolArray[i]}/staff/count`,
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "Accept": "application/json"
        }
      });

    } catch(err) {
      console.log(err);
    }

    try {

      staffDetails = await axios({
        method: "get",
        url: `${configuration.url}/ws/v1/school/${configuration.schoolArray[i]}/staff?expansions=emails`,
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "Accept": "application/json"
        }
      });

    } catch(err) {
      console.log(err);
    }

    districtArray.push({
      details: staffDetails.data,
      count: staffCount.data.resource.count,
      schoolName: schoolName,
      schoolID: schoolID
    });

  }

  if (STAFF_LIST == undefined) {
    STAFF_LIST = districtArray;
  }
  return districtArray;
}

function manage() {
  if (STAFF_LIST == undefined) {
    return "";
  } else {
    console.log(inspect(STAFF_LIST, false, null, true));
    return STAFF_LIST;
  }
}

// During startup call the function to get the data
getList();
console.log("Starting up Powerschool Staff Lists");

module.exports = {
  manage
};
