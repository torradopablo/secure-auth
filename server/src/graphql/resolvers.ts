import axios from 'axios';

  const resolvers = {
    
    Query: {
        getFruits: async () =>{
            return (await axios.get(`${process.env.API_PROVIDER_URL}/fruit/get`)).data
        },  
        
    },

    Mutation:{
        createFruit: async (_, {_id, name,  pricePerKilo}) => {
            return (await axios.post(`${process.env.API_PROVIDER_URL}/fruit/save`, {_id, name,pricePerKilo} )).data;        
        },
        deleteFruit: async (_,{_id}) => {
            return (await axios.delete(`${process.env.API_PROVIDER_URL}/fruit/delete/${_id}`)).data;   
        },
        updateFruit: async (_,{_id, name, pricePerKilo}) => {
            return (await axios.patch(`${process.env.API_PROVIDER_URL}/fruit/update/${_id}`,{name,pricePerKilo})).data;   
        },
    }
  };


export default resolvers;