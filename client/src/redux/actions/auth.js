import axios from 'axios';
const register = (name, email, password) => async (dispatch) => {
    try {
        const response = await axios.post('/api/users',
            JSON.stringify({name, email, password}), {headers: {'Content-Type': 'application/json'}});
        console.log(response);
    } catch (e) {
        console.log(e);
    }
}
export default register;