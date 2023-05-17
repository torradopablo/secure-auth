import axios from 'axios';

  const resolvers = {
    
    Query: {
        getFruits: async () =>{
            return (await axios.get('http://localhost:4001/fruit/get')).data
        },  
        
    },

    Mutation:{
        createFruit: async (_, {_id, name,  pricePerKilo}) => {
            return (await axios.post('http://localhost:4001/fruit/save', {_id, name,pricePerKilo} )).data;        
        },
        deleteFruit: async (_,{_id}) => {
            return (await axios.delete(`http://localhost:4001/fruit/delete/${_id}`)).data;   
        },
        updateFruit: async (_,{_id, name, pricePerKilo}) => {
            return (await axios.patch(`http://localhost:4001/fruit/update/${_id}`,{name,pricePerKilo})).data;   
        },
    }
  };


export default resolvers;