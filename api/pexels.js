import axios from 'axios';

// 563492ad6f91700001000001bf27f96046064df7bcf500233ad8cf15

export const getImages = async (searchTerm = 'programming') => await axios.get(`https://api.pexels.com/v1/search?query=${searchTerm}`,  {
    headers: {
        Authorization: '563492ad6f91700001000001bf27f96046064df7bcf500233ad8cf15'
    }
})