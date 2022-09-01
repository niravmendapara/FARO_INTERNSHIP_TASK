
import http from './http-Common'

class Main_Service{

    uploadimage(allimages){
        // console.log(allimages)
        return http.post("/uploadallimages", allimages)
    }

}

export default new Main_Service()