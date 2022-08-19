import axios from 'axios'

export function calculation(data)  {
    return axios.post('http://localhost:3000/calculation', {data}).then(response => {
        return response
    }).catch(error => {
        return error
    })
}





