export const useTableList = async(table:string)=>{
    const {data,error} = await useSupabaseClient().from(table).select('*').order('order',{ascending:false})
    if(error){
        return []
    }else{
        return data
    }

} 