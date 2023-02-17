import axios from 'axios'

const signin = async (username, password) => {
    let data = await axios.post(process.env.VUE_APP_BASE_API_URL + '/credentials/authorize?api-version=' + process.env.VUE_APP_API_VERSION, { 'clientId': username, 'clientSecret': password },
        { headers: { 'Content-Type': 'application/json' } })
  
    let massageData = data
    return massageData
}

const getAll =
    async (token) => {

        axios.defaults.headers.common['Authorization'] = token.accessToken
        let data = await axios.get(process.env.VUE_APP_BASE_API_URL + '/data/retrieve/all?api-version=' + process.env.VUE_APP_API_VERSION,
            {
                headers: {
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS'
                }
            })

        let all = data
        return all
    }


//service to retrieve all records
// fetch(process.env.VUE_APP_BASE_API_URL + '/retrieve/all', {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${process.env.VUE_API_AUTH}`,

//    // 'api-version': '2'
//   }
// },).then((response) => {

//   if (response.ok) {
//     return response.json();
//   }

// }).then((data) => {
//   const results = [];

//   for (let i = 0; i < data.length; i++) {
//     results.push({
//       id: data[i].id,
//       label: data[i].label,
//       description: data[i].description,
//       date: data[i].date,
//       color: data[i].color
//     });
//   }

//   this.games = results;

// })

export {
    signin,
    getAll
}
