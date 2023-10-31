const axios = require('axios');

const fetchData = async () => {
  const results = await axios.get('https://interview-apis-7982ee740505.herokuapp.com/suppliers/ZC100/sites');
}