

export default class TestData{

    constructor(baseurl) {
        this.baseurl = baseurl;
      }
    getSessions(){
        console.log(this.baseurl+"sessions");
        fetch(process.env.REACT_APP_BACKEND_BASE_URL+"sessions")
        .then(res => res.json())
        .then(
            (result) => {
                console.log("success");
                console.log(result);
                return result; 
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log(error);
                return [];
            }
        )
    }
}
