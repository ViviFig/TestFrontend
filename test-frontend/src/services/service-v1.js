import axios from 'axios'

const getAll =
    async () => {

        let data = await axios.get(process.env.VUE_APP_BASE_API_URL + '/data/retrieve/all?api-version=' + process.env.VUE_APP_API_VERSION,
            {
                headers: {
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS'
                }
            })

        let all = data.data
        return all
    }


const add = async (item) => {

    fetch(process.env.VUE_APP_BASE_API_URL + '/data/create?api-version=' + process.env.VUE_APP_API_VERSION, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',


            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS'
        },
        body: JSON.stringify({
            label: item.label,
            description: item.description,
            date: item.date,
            color: item.color

        })
    })
        .then(response => response.json())
        // .then(data => {
        //     console.log('Success:', data);
        // })
        .catch(error => {
            console.error('Error:', error);
        });
}
const edit = async (item) => {
    
    fetch(process.env.VUE_APP_BASE_API_URL + '/data/update?api-version=' + process.env.VUE_APP_API_VERSION, {
       
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({
            id: item.id,
            label: item.label,
            description: item.description,
            date: item.date,
            color: item.color

        })
    })
        .then(response => response.json())
        // .then(data => {
        //     console.log('Success:', data);
        // })
        .catch(error => {
            console.error('Error:', error);
        });


}
export {
    edit,
    add,
    getAll
}