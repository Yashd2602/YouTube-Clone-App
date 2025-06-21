export const APIKEY = 'AIzaSyDIR6OpuO1DicQ4fnoIjGPvOTFCAa9QqkM';
export const APIKEY1 = "AIzaSyBGgjC04WjE2D_0YYxrdtoQDxouZrx_PwU";

export const value_converter = (value) =>{
    if(value>=1000000){
        return Math.floor(value/1000000)+"M"
    }else if(value>=1000){
        return Math.floor(value/1000)+"K"
    }else{
       return value
    }
}