export const useTableList = async(table:string)=>{
    const {data,error} = await useSupabaseClient().from(table).select('*')
    if(error){
        return []
    }else{
        return data
    }
} 

export const useTableListByOrder = async(table:string)=>{
    const {data,error} = await useSupabaseClient().from(table).select('*').order('order',{ascending:false})
    if(error){
        return []
    }else{
        return data
    }

} 